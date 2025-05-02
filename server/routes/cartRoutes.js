const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart,updateCart } = require("../controllers/cartController");

router.post("/addToCart/:productId", addToCart);
router.delete("/removeFromCart/:productId", removeFromCart);
router.put("/updateCart", updateCart);
router.delete("/removeFromCart", removeFromCart);

router.get("/getCart", getCart); // New route to get cart items

module.exports = router;

