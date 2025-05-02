import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, RefreshCw, ShoppingCart, MapPin, X } from "lucide-react"; // Added X icon for cancel
import { useSelector } from "react-redux";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail=useSelector((state)=>state.user.email);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
  
        // Step 1: Fetch user _id by email using /getUserByEmail
        const userResponse = await fetch(
          `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(
            userEmail
          )}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
  
        const userData = await userResponse.json();
  
        if (!userResponse.ok) {
          throw new Error(userData.error || "Failed to fetch user data");
        }
  
        const userId = userData._id;
  
        // Step 2: Fetch orders using the user _id via /api/v1/orders/user-orders
        const ordersResponse = await fetch(
          `https://ecommerce-zof6.onrender.com/api/v1/orders/user-orders?userId=${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
  
        const ordersData = await ordersResponse.json();
  
        if (!ordersResponse.ok) {
          throw new Error(ordersData.message || "Failed to fetch orders");
        }
  
        // Log the orders data to inspect it
        console.log("Fetched orders data:", ordersData);
  
        // Check for orders with null productId
        const invalidOrders = ordersData.orders.filter(order => order.productId === null);
        if (invalidOrders.length > 0) {
          console.warn("Orders with null productId:", invalidOrders);
        }
  
        // Filter out orders with null productId
        const validOrders = ordersData.orders.filter(order => order.productId);
  
        setOrders(validOrders);
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(
          error.message ||
            "An error occurred while loading your orders. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
  
    if (!userEmail) {
      setError("User email not found. Please log in again.");
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [userEmail]);
  
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `https://ecommerce-zof6.onrender.com/api/v1/orders/cancel/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      const data = await response.json();
      if (response.ok) {
        console.log("Order canceled successfully:", data);
        // Update the orders state by filtering out or updating the canceled order
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: "cancelled" } : order
          )
        );
      } else {
        throw new Error(data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      setError(
        error.message ||
          "An error occurred while canceling the order. Please try again later."
      );
    }
  };
  
  // ...existing code...

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Package className="w-8 h-8 text-blue-600" />
            My Orders
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage all your past and current orders.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-red-600 text-lg font-medium">{error}</p>
            <button
              onClick={fetchOrders}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Retry
            </button>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order #{index + 1} (ID: {order._id})
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Products Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                      Products
                    </h3>
                    <div className="space-y-4">
                      {order.products.map((product, prodIndex) => (
                        <div
                          key={prodIndex}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                        >
                          <p className="text-gray-700 font-medium">
                            {product.productId.name ||
                              `Product ${prodIndex + 1}`}
                          </p>
                          <p className="text-gray-600">
                            Quantity: {product.quantity}
                          </p>
                          <p className="text-gray-600">
                            Price: ${product.price * product.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Delivery Address
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-gray-700 font-medium">
                        {order.address.addressType} Address:
                      </p>
                      <p className="text-gray-600">{order.address.street}</p>
                      <p className="text-gray-600">
                        {order.address.state || ""}
                      </p>
                      <p className="text-gray-600">
                        {order.address.city}, {order.address.country},{" "}
                        {order.address.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Price */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-lg font-bold text-gray-800">
                    Total: ${order.totalPrice.toFixed(2)}
                  </p>
                </div>

                {/* Cancel Order Button (only for non-canceled orders) */}
                {order.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg">You have no orders yet.</p>
            <button
              onClick={() => navigate("/cart")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <ShoppingCart className="w-5 h-5" />
              Go to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
