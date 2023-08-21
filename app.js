const express = require("express");
require("dotenv").config();

const { logger } = require("./middlewares/logger");
const { notfound, errorHandler } = require("./middlewares/Error");
const config = require("./config/db");
config();
/* const db = require('./database/db') */


// init App
const app = express();
app.use(express.json());
// Aplly middlewares

app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});
app.use("/aamati", require("./routes/aamati-route"));
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/users"));

//middleware error
app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 2004;
app.listen(PORT, () => {
  console.log(
    ` Server is Running in mode: ${process.env.NODE_ENV} , on port : ${process.env.PORT}`
  );
});
