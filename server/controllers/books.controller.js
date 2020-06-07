const Book = require("../models/Book.model");
const ErrorResponse = require("../utils/errorResponse");

exports.getBooks = async (req, res, next) => {
  try {
    return res.status(200).json(res.advancedResults);
  } catch (error) {
    return next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    // Add user to req,body
    req.body.user = req.user.id;
    const book = await Book.create(req.body);

    return res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(
        new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is book owner
    if (book.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to see this book`,
          401
        )
      );
    }

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      next(
        new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is book owner
    if (book.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this book`,
          401
        )
      );
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      next(
        new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is book owner
    if (book.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this book`,
          401
        )
      );
    }

    await book.remove();

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return next(error);
  }
};
