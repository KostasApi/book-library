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

module.exports = (api, path = "/users") => {
  /**
   * @swagger
   * /api/v1/users/signup:
   *   post:
   *     summary: Register a user
   *     description: Returns a new user
   *     tags:
   *      - Users
   *     consumes:
   *      - application/x-www-form-urlencoded
   *     requestBody:
   *       content:
   *          application/x-www-form-urlencoded:
   *             schema:
   *                type: object
   *                properties:
   *                   email:
   *                      type: string
   *                   password:
   *                      type: string
   *                   firstname:
   *                      type: string
   *                   lastname:
   *                      type: string
   *     responses:
   *       201:
   *         description: New user
   *         schema:
   *           type: object
   *       400:
   *         description: User error
   *         schema:
   *           type: object
   *       404:
   *         description: User error
   *         schema:
   *           type: object
   *       500:
   *         description: Server error
   *         schema:
   *           type: object
   */
  api.router.post(
    `${path}/signup`,
    passport.authenticate("signup", { session: false, failWithError: true }),
    signupUser
  );

  /**
   * @swagger
   * /api/v1/users/signin:
   *   post:
   *     summary: Login a user
   *     description: Returns a token and user info
   *     tags:
   *      - Users
   *     consumes:
   *      - application/x-www-form-urlencoded
   *     requestBody:
   *       content:
   *          application/x-www-form-urlencoded:
   *             schema:
   *                type: object
   *                properties:
   *                   email:
   *                      type: string
   *                   password:
   *                      type: string
   *     responses:
   *       200:
   *         description: A bearer token and user info
   *         schema:
   *           type: object
   *       400:
   *         description: User error
   *         schema:
   *           type: object
   *       404:
   *         description: User error
   *         schema:
   *           type: object
   *       500:
   *         description: Server error
   *         schema:
   *           type: object
   */
  api.router.post(
    `${path}/signin`,
    passport.authenticate("signin", { session: false, failWithError: true }),
    signinUser
  );

  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     summary: Get a list of users
   *     description: Returns users
   *     security:
   *       - BearerAuth: []
   *     tags:
   *      - Users
   *        - Admin
   *     responses:
   *       200:
   *         description: List of users
   *         schema:
   *           type: array
   *       400:
   *         description: User error
   *         schema:
   *           type: object
   *       401:
   *         description: Unauthorized
   *         schema:
   *           type: object
   *       404:
   *         description: User error
   *         schema:
   *           type: object
   *       500:
   *         description: Server error
   *         schema:
   *           type: object
   */
  api.router
    .route(`${path}/`)
    .get(
      passport.authenticate("jwt", { session: false }),
      authorize("admin"),
      getUsers
    );

  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     summary: Register a user
   *     description: Returns a new user
   *     security:
   *       - BearerAuth: []
   *     tags:
   *      - Users
   *        - Admin
   *     consumes:
   *      - application/x-www-form-urlencoded
   *     requestBody:
   *       content:
   *          application/x-www-form-urlencoded:
   *             schema:
   *                type: object
   *                properties:
   *                   email:
   *                      type: string
   *                   password:
   *                      type: string
   *                   firstname:
   *                      type: string
   *                   lastname:
   *                      type: string
   *     responses:
   *       201:
   *         description: New user
   *         schema:
   *           type: object
   *       400:
   *         description: User error
   *         schema:
   *           type: object
   *       401:
   *         description: Unauthorized
   *         schema:
   *           type: object
   *       404:
   *         description: User error
   *         schema:
   *           type: object
   *       500:
   *         description: Server error
   *         schema:
   *           type: object
   */
  api.router
    .route(`${path}/`)
    .post(
      passport.authenticate("jwt", { session: false }),
      authorize("admin"),
      signupUser
    );

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     summary: Get a single user
   *     description: Returns users
   *     parameters:
   *       - name: id
   *         in: path
   *         description: User ID
   *         required: true
   *         schema:
   *           type: string
   *     security:
   *       - BearerAuth: []
   *     tags:
   *      - Users
   *        - Admin
   *     responses:
   *       200:
   *         description: List a scecific user
   *         schema:
   *           type: object
   *       400:
   *         description: User error
   *         schema:
   *           type: object
   *       401:
   *         description: Unauthorized
   *         schema:
   *           type: object
   *       404:
   *         description: User error
   *         schema:
   *           type: object
   *       500:
   *         description: Server error
   *         schema:
   *           type: object
   */
  api.router
    .route(`${path}/:id`)
    .get(
      passport.authenticate("jwt", { session: false }),
      authorize("admin"),
      getUser
    );

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   put:
   *     summary: Update a user
   *     description: Returns a user
   *     parameters:
   *       - name: id
   *         in: path
   *         description: User ID
   *         required: true
   *         schema:
   *           type: string
   *     security:
   *       - BearerAuth: []
   *     tags:
   *      - Users
   *        - Admin
   *     consumes:
   *      - application/x-www-form-urlencoded
   *     requestBody:
   *       content:
   *          application/x-www-form-urlencoded:
   *             schema:
   *                type: object
   *                properties:
   *                   email:
   *                      type: string
   *                   password:
   *                      type: string
   *                   firstname:
   *                      type: string
   *                   lastname:
   *                      type: string
   *     responses:
   *       200:
   *         description: A user
   *         schema:
   *           type: object
   *       400:
   *         description: User error
   *         schema:
   *           type: object
   *       401:
   *         description: Unauthorized
   *         schema:
   *           type: object
   *       404:
   *         description: User error
   *         schema:
   *           type: object
   *       500:
   *         description: Server error
   *         schema:
   *           type: object
   */
  api.router
    .route(`${path}/:id`)
    .put(
      passport.authenticate("jwt", { session: false }),
      authorize("admin"),
      updateUser
    );

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Delete a user
   *     description: Delete a user
   *     parameters:
   *       - name: id
   *         in: path
   *         description: User ID
   *         required: true
   *         schema:
   *           type: string
   *     security:
   *       - BearerAuth: []
   *     tags:
   *      - Users
   *        - Admin
   *     responses:
   *       200:
   *         description: Empty object
   *         schema:
   *           type: object
   *       400:
   *         description: User error
   *         schema:
   *           type: object
   *       401:
   *         description: Unauthorized
   *         schema:
   *           type: object
   *       404:
   *         description: User error
   *         schema:
   *           type: object
   *       500:
   *         description: Server error
   *         schema:
   *           type: object
   */
  api.router
    .route(`${path}/:id`)
    .delete(
      passport.authenticate("jwt", { session: false }),
      authorize("admin"),
      deleteUser
    );

  return api;
};
