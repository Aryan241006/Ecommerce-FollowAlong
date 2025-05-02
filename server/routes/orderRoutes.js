const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders,cancelOrder } = require('../controllers/orderController'); // Adjust path based on your project structure

// Create a new order
router.post('/create', createOrder);

// Get all orders for a user
router.get('/user-orders', getUserOrders);

router.put('/cancel/:orderId', cancelOrder); // Using PUT for update (canceling is an update operation)

module.exports = router;