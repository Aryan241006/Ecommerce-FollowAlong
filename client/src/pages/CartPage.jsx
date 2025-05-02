import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  Truck,
  Phone,
  MessageSquare,
  Gift,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();
  const userEmail=useSelector((state)=>state.user.email);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(
          `https://ecommerce-zof6.onrender.com/getCart?userEmail=${userEmail}`
        );
  
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const data = await res.json();
        console.log("Fetched cart items:", data);
  
        const validCartItems = (data.cart || []).filter(item => item.productId);
        setCartItems(validCartItems);
  
        // Calculate subtotal
        const total = validCartItems.reduce(
          (sum, item) => sum + item.productId.price * item.quantity,
          0
        );
        setSubtotal(total);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchCart();
  }, [userEmail]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(
        "https://ecommerce-zof6.onrender.com/updateCart",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail,
            productId,
            quantity: newQuantity,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedItems = cartItems.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );

      setCartItems(updatedItems);

      // Recalculate subtotal
      const total = updatedItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
      setSubtotal(total);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(
        "https://ecommerce-zof6.onrender.com/removeFromCart",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail,
            productId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      const updatedItems = cartItems.filter(
        (item) => item.productId._id !== productId
      );

      setCartItems(updatedItems);

      // Recalculate subtotal
      const total = updatedItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
      setSubtotal(total);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const applyCoupon = () => {
    // Mock coupon application - in a real app, this would validate with the backend
    if (couponCode.toLowerCase() === "discount10") {
      const discountAmount = subtotal * 0.1; // 10% discount
      setDiscount(discountAmount);
    } else {
      alert("Invalid coupon code");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Cart items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center mb-6">
              <ShoppingBag className="mr-2 text-2xl text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Shopping Bag</h1>
              <span className="ml-2 text-gray-600">
                {cartItems.length} items in your bag.
              </span>
            </div>

            {cartItems.length > 0 ? (
              <div>
                {/* Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total Price</div>
                </div>

                {/* Cart items */}
                <ul className="divide-y">
                  {cartItems.map((item) => (
                    <li
                      key={item.productId._id}
                      className="py-6 grid md:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product info */}
                      <div className="col-span-6 flex items-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mr-4">
                          {item.productId.image ? (
                            <img
                              src={item.productId.image}
                              alt={item.productId.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No image
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase">
                            {item.productId.category || "CATEGORY"}
                          </div>
                          <div className="font-medium text-gray-800">
                            {item.productId.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            <span>Color: {item.productId.color || "N/A"}</span>
                            <span className="mx-2">•</span>
                            <span>Size: {item.productId.size || "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-right text-gray-800">
                        ${item.productId.price?.toFixed(2) || "0.00"}
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId._id,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 text-center w-10 border-x">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId._id,
                                item.quantity + 1
                              )
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Total price and delete */}
                      <div className="col-span-2 flex justify-between items-center">
                        <span className="font-medium text-gray-800 text-right flex-grow">
                          ${(item.productId.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.productId._id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Features section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 flex items-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-pink-100 p-2 rounded-full mr-3">
                <Truck className="text-pink-500" size={20} />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">Free Shipping</p>
                <p className="text-gray-500">When you spend $50+</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-orange-100 p-2 rounded-full mr-3">
                <Phone className="text-orange-500" size={20} />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">Call Us Anytime</p>
                <p className="text-gray-500">+1 234 567 8900</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <MessageSquare className="text-green-500" size={20} />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">Chat With Us</p>
                <p className="text-gray-500">24-hour support</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <Gift className="text-yellow-500" size={20} />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">Gift Cards</p>
                <p className="text-gray-500">Perfect for anyone</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Order summary */}
        <div className="lg:w-1/3">
          {/* Coupon code */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Coupon Code
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter your coupon code to get discounts on your order.
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={applyCoupon}
              >
                Apply
              </button>
            </div>
          </div>

          {/* Cart total */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Cart Total</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Cart Subtotal</span>
                <span className="text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Design by Fluttershop</span>
                <span className="text-gray-800">Free</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span className="text-gray-800">Cart Total</span>
                <span className="text-gray-800">
                  ${(subtotal - discount).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                // const userEmail = localStorage.getItem("userEmail");
                if (userEmail) {
                  navigate(
                    `/select-address?userEmail=${encodeURIComponent(userEmail)}`
                  );
                } else {
                  console.error("No userEmail found in localStorage");
                  // Optionally, redirect to login or show an error
                }
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition duration-300"
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
