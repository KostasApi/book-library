const Book = require("../models/Book.model");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      res
        .status(404)
        .json({ error: `Book not found with id of ${req.params.id}` });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res
        .status(404)
        .json({ error: `Book not found with id of ${req.params.id}` });
    }

    await book.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(404).json({ error });
  }
};
