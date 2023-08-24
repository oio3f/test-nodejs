const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/virfyToken");
const {
  getAllBooks,
  getBookById,
  newBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

//Routknowledge

/**
 * @desc get all books
 * @route /books/
 * @method GET
 * @access public
 **/

router.get("/", getAllBooks);

/**
 * @desc get book by id
 * @route /books/:id
 * @method GET
 * @access public
 **/
router.get("/:id", getBookById);

/**
 * @desc Add New book
 * @route /books/
 * @method POST
 * @access public
 **/
router.post("/", verifyTokenAndAdmin, newBook);

/**
 * @desc PUT item
 * @route /books/:id
 * @method PUT
 * @access public
 **/
router.put("/:id", verifyTokenAndAdmin, updateBook);

/**
 * @desc  DELETE item
 * @route /books/:id
 * @method DELETE
 * @access public
 **/

router.delete("/:id", verifyTokenAndAdmin, deleteBook);

module.exports = router;
