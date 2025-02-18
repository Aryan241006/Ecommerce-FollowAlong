const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const { validateOrder, validate } = require('../middleware/validation');

// Get user's orders
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
                                .populate('items.product')
                                .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Create order from cart
router.post('/create', [auth, validateOrder, validate], async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId })
                              .populate('items.product');
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        const total = orderItems.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
        );

        const order = new Order({
            user: req.user.userId,
            items: orderItems,
            total,
            shippingAddress: req.body.shippingAddress
        });

        await order.save();
        
        // Clear the cart
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order' });
    }
});

// Get order details
router.get('/:orderId', auth, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.orderId,
            user: req.user.userId
        }).populate('items.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details' });
    }
});

module.exports = router;