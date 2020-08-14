/* eslint-disable no-underscore-dangle */
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const ErrorResponse = require("../utils/errorResponse");

exports.signupUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

exports.signinUser = (req, res, next) => {
  const { user } = req;
  try {
    return req.login(user, { session: false }, error => {
      if (error) return next(error);
      // We don't want to store the sensitive information such as the
      // user password in the token so we pick only the email and id
      const body = {
        _id: user._id,
        email: user.email,
      };
      // Sign the JWT token and populate the payload with the user email and id
      const token = jwt.sign(
        {
          user: body,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );

      const userInfo = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      // Send back the token and user info
      return res.status(200).json({
        success: true,
        data: { token, user: userInfo },
      });
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("books");

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

    await user.remove();

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return next(error);
  }
};
