const Cart = require("../models/cartschema");

const addToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.productId;
    const userEmail = req.body.userEmail; // Get userEmail from request body

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = new Cart({ userEmail, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { userEmail, productId } = req.body;

    if (!userEmail || !productId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const cart = await Cart.findOne({ userEmail });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    await cart.save();
    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




const getCart = async (req, res) => {
    try {
      const userEmail = req.query.userEmail; // Get email from query params
  
      if (!userEmail) {
        return res.status(400).json({ message: "User email is required" });
      }
  
      const cart = await Cart.findOne({ userEmail }).populate("items.productId");
  
      if (!cart) {
        return res.status(200).json({ cart: [] });
      }
  
      res.status(200).json({ cart: cart.items });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  const updateCart = async (req, res) => {
    try {
      const { userEmail, productId, quantity } = req.body;
  
      if (!userEmail || !productId || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const cart = await Cart.findOne({ userEmail });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const item = cart.items.find((item) => item.productId.equals(productId));
  
      if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
  
      item.quantity = quantity;
      await cart.save();
      res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // module.exports = { addToCart, getCart };
  
  
  
module.exports = { addToCart, getCart,removeFromCart,updateCart };
