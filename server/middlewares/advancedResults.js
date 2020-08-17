const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // If not admin, include user id to mongoose query
  if (req.user.role !== "admin") {
    reqQuery.user = req.user.id;
  }

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Create "like" funcionality for each query parameter, except user
  const jsonQueryStr = JSON.parse(queryStr);
  Object.keys(jsonQueryStr).forEach(key => {
    if (key !== "user") jsonQueryStr[key] = new RegExp(jsonQueryStr[key], "i");
  });

  // Finding resource
  query = model.find(jsonQueryStr);

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(jsonQueryStr);

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  let results = {};
  // if user is admin or cache is unavailable or search query has values return data from mongo
  if (
    req.user.role === "admin" ||
    !res.locals.api.isCacheAvailable ||
    Object.keys(reqQuery).length !== 1
  ) {
    console.log("Return data from MongoDB");
    results = await query;
  } else {
    // else return data from cache if exist
    results = await query.cache({
      key: req.user.id,
    });
  }

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
