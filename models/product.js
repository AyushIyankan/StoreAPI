const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
  },
  price: {
    type: Number,
    required: [true, "Product price is required."],
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
