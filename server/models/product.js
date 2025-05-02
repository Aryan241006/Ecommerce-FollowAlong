const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  description: {
    type: String,
    required: [true],
  },
  price: {
    type: Number,
    required: [true],
    min: [0],
  },
  category: {
    type: String,
    required: [true],
  },
  images: {
    type: [String], 
    required: [true],
  },
  userEmail: {
    type: String,
    // required: [true], changed now
  }
  
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;