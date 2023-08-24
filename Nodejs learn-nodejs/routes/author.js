const express = require("express");
const router = express.Router();

const { verifyTokenAndAdmin } = require("../middlewares/virfyToken");
const {
  getAllAuthors,
  newAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
/**
 * @desc get All Author
 * @route api/v1/author/
 * @method GET
 * @access Public
 **/
router.get("/", getAllAuthors);
/**
 * @desc new Author
 * @route api/v1/author/
 * @method POST
 * @access Privte (only Admin)
 **/
router.post("/", verifyTokenAndAdmin, newAuthor);
/**
 * @desc update Author
 * @route api/v1/author/:id
 * @method PUT
 * @access Privte (only Admin)
 **/
router.put("/:id", verifyTokenAndAdmin, updateAuthor);

/**
 * @desc delete Authorr
 * @route api/v1/author/:id
 * @method DELETE
 * @access Privte (only Admin)
 **/
router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
