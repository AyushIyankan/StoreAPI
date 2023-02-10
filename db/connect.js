const mongoose = require("mongoose");

const connectDB = async (url) => {
  mongoose.set("strictQuery", false);
  return mongoose
    .connect(url)
    .then((res) => console.log(`Database Connected.`))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
