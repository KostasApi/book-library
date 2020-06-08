const express = require("express");
const passport = require("passport");

const { authorize } = require("../../middlewares/authorization");
const advancedResults = require("../../middlewares/advancedResults");
const clearCache = require("../../middlewares/clearCache");
const Book = require("../../models/Book.model");

const {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../../controllers/books.controller");

const router = express.Router();

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Get a list of books
 *     description: Returns books
 *     parameters:
 *       - name: title
 *         in: query
 *         description: Book Title
 *         required: false
 *         schema:
 *           type: string
 *       - name: author
 *         in: query
 *         description: Book Author
 *         required: false
 *         schema:
 *           type: string
 *       - name: description
 *         in: query
 *         description: Book Description
 *         required: false
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Books
 *     responses:
 *       200:
 *         description: List of books
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
router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    authorize("admin", "user"),
    advancedResults(Book),
    getBooks
  );

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     tags:
 *      - Books
 *     summary: Create a book
 *     description: Create a book
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *      - application/x-www-form-urlencoded
 *     requestBody:
 *       content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *                type: object
 *                properties:
 *                   title:
 *                      type: string
 *                   description:
 *                      type: string
 *                   author:
 *                      type: string
 *     responses:
 *       201:
 *         description: Book created
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
router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    authorize("admin", "user"),
    clearCache,
    createBook
  );

/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Returns a book
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *      $ref: '#/components/requestBodies/book'
 *     responses:
 *       200:
 *         description: A book
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
 *
 * components:
 *  requestBodies:
 *    book:
 *      description: A JSON object containing pet information
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/book'
 *  schemas:
 *    book:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        author:
 *          type: string
 */
router
  .route("/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    authorize("admin", "user"),
    getBook
  );

/**
 * @swagger
 * /api/v1/books/{id}:
 *   get:
 *     summary: Get a single book
 *     description: Returns a book
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A book
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
router
  .route("/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    authorize("admin", "user"),
    clearCache,
    updateBook
  );

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Delete a book
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book ID
 *         required: true
 *         schema:
 *           type: string
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
router
  .route("/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    authorize("admin", "user"),
    clearCache,
    deleteBook
  );

module.exports = router;
