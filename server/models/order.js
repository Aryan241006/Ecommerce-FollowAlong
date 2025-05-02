const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Links to the user's _id in the users collection
  products: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    price: { 
      type: Number, 
      required: true 
    }
  }], // Array of products with their IDs, quantities, and prices
  totalPrice: { 
    type: Number, 
    required: true 
  }, // Total cost of the order
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    addressType: String
  }, // Delivery address matching the Profile schema's addresses structure
  status: { 
    type: String, 
    default: 'pending', 
    enum: ['pending', 'shipped', 'delivered', 'cancelled'] 
  }, // Order status with predefined values
  createdAt: { 
    type: Date, 
    default: Date.now 
  }, // Timestamp for order creation
  updatedAt: { 
    type: Date, 
    default: Date.now 
  } // Timestamp for last update
});

module.exports = mongoose.model('Order', orderSchema);