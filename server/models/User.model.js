/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    firstname: {
      type: String,
      required: [true, "Please add first name"],
      trim: true,
      maxlength: [50, "First name can not be more than 50 characters"],
      minlength: [2, "First name can not be less than 2 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Please add last name"],
      trim: true,
      maxlength: [50, "Last name can not be more than 50 characters"],
      minlength: [2, "Last name can not be less than 2 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// This is called a pre-hook, before the user information is saved in the database
// this function will be called, we'll get the plain text password, hash it and store it.
UserSchema.pre("save", async function (next) {
  // 'this' refers to the current document about to be saved
  const user = this;

  // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  // your application becomes. Replace the plain text password with the hash and then store it
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // Indicates we're done and moves on to the next middleware
  next();
});

// We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  // Hashes the password sent by the user for login and checks if the hashed password stored in the
  // database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

// Cascade delete books when a user is deleted
UserSchema.pre("remove", async function (next) {
  console.log(`Books being removed from user ${this._id}`);
  await this.model("Book").deleteMany({ user: this._id });
  next();
});

// Reverse populate with virtuals
UserSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
