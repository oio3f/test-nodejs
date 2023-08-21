const mongoose = require("mongoose");

async function connectToDB() {
  try {
   await  mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

/* mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
 */
module.exports = connectToDB;
