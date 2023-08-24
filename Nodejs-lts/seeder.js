const { books, authors } = require("./data");
const { Books } = require("./models/book");
const { Author } = require("./models/Author");
require("dotenv").config();
const connectToDB = require("./config/db");

//connect to db
connectToDB();
console.log("Connected to the database.");

//import books
const importBooks = async () => {
  try {
    await Books.insertMany(books);
    console.log("Imported books.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//import authors
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Imported authors");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//remove books
const removeBooks = async () => {
  try {
    await Books.deleteMany();
    console.log("Deleted books.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") {
  console.log("start Import books...");
  importBooks();
} else if (process.argv[2] === "-import-authors") {
  console.log("start import authors...");
  importAuthors();
} else if (process.argv[2] === "-remove") {
  console.log("start Remove books...");
  removeBooks();
} else {
  console.log("Invalid command.");
}
