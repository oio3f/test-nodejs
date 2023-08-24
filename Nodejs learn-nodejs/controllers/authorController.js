const asyncHandler = require("express-async-handler");

const {
  Author,
  validateAuthorNew,
  validateAuthorUpdate,
} = require("../models/Author");


/**
 * @desc get All Author
 * @route api/v1/author/
 * @method GET
 * @access Public 
 **/
const getAllAuthors = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query;
  const authorPerPage = 2;
  const Authors = await Author.find()
    .skip((pageNumber - 1) * authorPerPage)
    .limit(authorPerPage);
  res.status(200).json(Authors);
});

/**
 * @desc new Author
 * @route api/v1/author/
 * @method POST
 * @access Privte (only Admin)
 **/
const newAuthor = asyncHandler(async (req, res) => {
  const b = req.body;
  validateAuthorNew(b);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const newAuthor = await new Author({
      firstname: b.firstname,
      lastname: b.lastname,
      nationality: b.nationality,
      image: b.image,
    });
    const result = await newAuthor.save();
    res.status(201).json(result);
  }
});
/** 
 * @desc update Author
 * @route api/v1/author/:id
 * @method PUT
 * @access Privte (only Admin)
 **/
const updateAuthor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const b = req.body;
  validateAuthorUpdate(b);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const find = await Author.findByIdAndUpdate(id);
    if (find) {
      const updateAuthor = await Author.findByIdAndUpdate(
        id,
        {
          $set: {
            firstname: b.firstname,
            lastname: b.lastname,
            nationality: b.nationality,
            image: b.image,
          },
        },
        { new: true }
      );

      res.status(200).json(updateAuthor);
    } else {
      res.status(400).json({ message: "not found the Author" });
    }
  }
});
/**
 * @desc delete Authorr
 * @route api/v1/author/:id
 * @method DELETE
 * @access Privte (only Admin)
 **/
const deleteAuthor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const find = await Author.findById(id);
  if (find) {
    await Author.findByIdAndDelete(id);
    res.status(200).json({ message: "Author has been deleted successfully " });
  } else {
    res.status(401).json({ message: "not found the Author" });
  }
});
module.exports = {
    getAllAuthors,
    newAuthor,
    updateAuthor,
    deleteAuthor
}