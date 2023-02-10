require("dotenv").config();

const Product = require("./models/product");
const connectDB = require("./db/connect");
const productsJSON = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(productsJSON);
    console.log("Success");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};

start();
