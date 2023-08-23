const express = require("express");
require("dotenv").config();
const cors = require("cors")

const { logger } = require("./middlewares/logger");
const { notfound, errorHandler } = require("./middlewares/Error");
const config = require("./config/db");
// connect to DB
config();
/* const db = require('./database/db') */

// init App
const app = express();
app.use(express.json());
// Aplly middlewares
app.use(
  cors({
    origin: "http://localhost:2003/",
  })
);
app.use(logger);

app.get("/", (req, res) => {
  re.status(200).json({messge:"Welcome to the home page!"});
});
app.use("/api/v1/author", require("./routes/author")); // the author for books
app.use("/api/v1/auth", require("./routes/auth")); // login or register
app.use("/api/v1/user", require("./routes/users")); // update acount or delete
app.use("/api/v1/books", require("./routes/books")); // the books

//middleware error
app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 2004;
app.listen(PORT, () => {
  console.log(
    ` Server is Running in mode: ${process.env.NODE_ENV} , on port : ${process.env.PORT}`
  );
});
