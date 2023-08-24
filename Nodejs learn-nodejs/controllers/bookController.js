const asyncHandler = require("express-async-handler");

const { validateNEWbody, validatePUTbody, Books } = require("../models/book");

/**
 * @desc get all books
 * @route /Books/
 * @method GET
 * @access public
 **/
const getAllBooks = asyncHandler(async (req, res) => {
  const query = req.query;
  const noPrice = query.notPrice;
  const notPrice = noPrice ? noPrice === "true" : false;

  const price = query.price;
  const isArray = price ? Array.isArray(price) : false; // in next line about that
  // true if price query Multiple choice And the benefit of it is to determine the use $eq or $in

  let findBy = {};

  // Comparison Query Operators
  // $eq : N => (price == N) // equal
  // $ne : N => (price != N) // not equal
  // $lt : N => (price < N) // Younger than
  // $lte : N => (price =< N) // Younger than and equal
  // $gt : N => (price < N) // bigger than
  // $gte : N => (price =< N) //bigger than and equal
  // $in :[N1 , N2 ,N3] => (price == [N1 , N2 ,N3]) // equal item in array
  // $nin :[N1 , N2 ,N3] => (price != [N1 , N2 ,N3]) // not equal item in array

  if (price) {
    if (isArray) {
      findBy.price = notPrice ? { $nin: price } : { $in: price };
    } else {
      findBy.price = notPrice ? { $ne: price } : { $eq: price };
    }
  }

  const AllBooks = await Books.find(findBy).populate(
    "author",
    "_id firstname lastname"
  );

  if (AllBooks.length > 0) {
    res.status(200).json(AllBooks);
  } else {
    res.status(404).json({ message: "No books found" });
  }
});

/**
 * @desc get book by id
 * @route /find/:id
 * @method GET
 * @access public
 **/
const getBookById = asyncHandler(async (req, res) => {
  const book = await Books.findById(req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json("not found the book");
  }
});

/**
 * @desc Add New book
 * @route /book/
 * @method POST
 * @access public
 **/
const newBook = asyncHandler(async (req, res) => {
  validateNEWbody(req.body);
  if (error) {
    res.status(401).send(error.details[0].message);
  } else {
    const b = req.body;
    const book = await new Books({
      title: b.title,
      description: b.description,
      author: b.author,
      price: b.price,
    });
    const result = await book.save();
    res.status(201).json(result); // 201 for the create item successfully
  }
});

/**
 * @desc PUT item
 * @route /edit
 * @method PUT
 * @access public
 **/
const updateBook = asyncHandler(async (req, res) => {
  const find = await Books.findById(req.params.id);
  validatePUTbody(req.body);
  if (find) {
    if (error) {
      res.status(404).send(error.details[0].message);
    } else {
      const b = req.body;
      const updateBook = await Books.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: b.title,
            description: b.description,
            author: b.author,
            price: b.price,
          },
        },
        { new: true }
      );
      res.status(200).json(updateBook); // 200 for the update item successfully
    }
  } else {
    res.status(404).send("the book not found");
  }
});

/**
 * @desc  DELETE item
 * @route /del
 * @method DELETE
 * @access public
 **/
const deleteBook = asyncHandler(async (req, res) => {
  const idItem = req.params.id;
  const find = await Books.findById(idItem);
  if (find) {
    await Books.findByIdAndDelete(idItem);
    res.status(200).json(" your has been deleted book sucesfly");
  } else {
    res.status(400).send("this book not foundo");
  }
});
module.exports = {
  getAllBooks,
  getBookById,
  newBook,
  updateBook,
  deleteBook
};
