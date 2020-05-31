const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
      trim: true,
      maxlength: [50, "Title can not be more than 50 characters"],
      minlength: [2, "Title can not be less than 2 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please add an author"],
      trim: true,
      maxlength: [50, "Author can not be more than 30 characters"],
      minlength: [2, "Author can not be less than 2 characters"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", BookSchema);
