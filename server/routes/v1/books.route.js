const express = require("express");

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
 *     tags:
 *      - Books
 *     responses:
 *       200:
 *         description: List of books
 *         schema:
 *           type: array
 *       404:
 *         description: Error
 *         schema:
 *           type: object
 */
router.route("/").get(getBooks);

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     tags:
 *      - Books
 *     summary: Create a book
 *     description: Create a book
 *     consumes:
 *      - application/x-www-form-urlencoded
 *     requestBody:
 *       content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *                type: object
 *                properties:
 *                   name:
 *                      type: string
 *                   description:
 *                      type: string
 *     responses:
 *       201:
 *         description: Book created
 *         schema:
 *           type: object
 *       404:
 *         description: Error
 *         schema:
 *           type: object
 */
router.route("/").post(createBook);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Returns a book
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
 *       404:
 *         description: Error
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
 *        name:
 *          type: string
 *        description:
 *          type: string
 */
router.route("/:id").get(getBook);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   get:
 *     summary: Get a single book
 *     description: Returns a book
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
 *       404:
 *         description: Error
 *         schema:
 *           type: object
 */
router.route("/:id").put(updateBook);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Delete a book
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
 *       404:
 *         description: Error
 *         schema:
 *           type: object
 */
router.route("/:id").delete(deleteBook);

module.exports = router;
