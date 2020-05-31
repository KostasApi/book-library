const express = require("express");
const passport = require("passport");

const { authorize } = require("../../middlewares/authorization");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signupUser,
  signinUser,
} = require("../../controllers/user.controller");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false, failWithError: true }),
  signupUser
);

router.post(
  "/signin",
  passport.authenticate("signin", { session: false, failWithError: true }),
  signinUser
);

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    authorize("admin"),
    getUsers
  );

router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    authorize("admin"),
    signupUser
  );

router
  .route("/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    authorize("admin"),
    getUser
  );

router
  .route("/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    authorize("admin"),
    updateUser
  );

router
  .route("/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    authorize("admin"),
    deleteUser
  );

module.exports = router;
