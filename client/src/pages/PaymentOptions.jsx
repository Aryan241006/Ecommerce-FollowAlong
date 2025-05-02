

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreditCard, DollarSign, Truck, CheckCircle, AlertCircle } from "lucide-react";

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [error, setError] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const { userEmail, cartItems, subtotal, selectedAddress } = state || {};

  useEffect(() => {
    if (!userEmail || !cartItems || !subtotal || !selectedAddress) {
      setError("Missing order details. Please go back and try again.");
    }
  }, [userEmail, cartItems, subtotal, selectedAddress]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const placeOrder = async () => {
    try {
      const userResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const userData = await userResponse.json();
      const userId = userData._id;

      if (!userResponse.ok) throw new Error(userData.error || "Failed to fetch user data");

      const orderResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/api/v1/orders/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            products: cartItems.map(item => ({
              productId: item.productId._id,
              quantity: item.quantity,
              price: item.productId.price,
            })),
            totalPrice: subtotal,
            address: selectedAddress,
          }),
        }
      );

      const orderData = await orderResponse.json();
      if (orderResponse.ok) {
        console.log("Order placed successfully:", orderData);
        setIsOrderPlaced(true);
        setTimeout(() => navigate("/order-success"), 5000);
      } else throw new Error(orderData.error || "Failed to place order");
    } catch (error) {
      console.error("Error placing order:", error);
      setError(`Failed to place order. Please try again. Details: ${error.message}`);
    }
  };

  const handlePaypalOrderCreate = (data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (subtotal / 100).toFixed(2),
          },
          description: "Order from E-commerce App",
        },
      ],
    }).then((orderId) => {
      console.log("PayPal Order ID:", orderId);
      return orderId;
    });
  };

  const handlePaypalOrderApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      console.log("PayPal Payment Successful:", details);
      await placeOrder();
    } catch (error) {
      console.error("PayPal Payment Error:", error);
      setError("Payment failed. Please try again.");
    }
  };

  const handlePaypalOrderError = (err) => {
    console.error("PayPal Error:", err);
    setError("An error occurred during payment. Please try again.");
  };

  const handleCODOrder = () => {
    placeOrder();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 pt-24 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/order-confirmation", { state })}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Return to Previous Page
          </button>
        </div>
      </div>
    );
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 pt-24 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-600 mb-6">
            You'll be redirected in <span className="text-blue-600 font-semibold">5 seconds</span>...
          </p>
          <button
            onClick={() => navigate("/order-success")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-blue-600 text-white">
            <h1 className="text-2xl font-bold">Payment Options</h1>
            <p className="text-blue-100">Complete your purchase</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h2>
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Items:</span>
                <span>{cartItems?.length}</span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold text-lg mt-2 pt-2 border-t border-gray-300">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <div
                  className={`p-4 border rounded-lg cursor-pointer flex items-center ${
                    paymentMethod === "Online"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("Online")}
                >
                  <input
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={handlePaymentMethodChange}
                    className="mr-3"
                  />
                  <label htmlFor="online" className="flex items-center cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="font-medium text-gray-800">Online Payment</p>
                      <p className="text-sm text-gray-500">Pay securely via PayPal</p>
                    </div>
                  </label>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer flex items-center ${
                    paymentMethod === "COD"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={handlePaymentMethodChange}
                    className="mr-3"
                  />
                  <label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="font-medium text-gray-800">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start mb-2">
                  <Truck className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{selectedAddress?.addressType || "Shipping Address"}</p>
                    <p className="text-gray-600">{selectedAddress?.street}</p>
                    <p className="text-gray-600">
                      {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.zipCode}
                    </p>
                    <p className="text-gray-600">{selectedAddress?.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            {paymentMethod === "COD" ? (
              <button
                onClick={handleCODOrder}
                className="w-full px-6 py-3 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition duration-200"
              >
                Confirm COD Order
              </button>
            ) : (
              <PayPalScriptProvider
                options={{
                  "client-id": "AfgcHduOoiJNu9HOgzarIDzB_bQTRJCpGUFzV4RCspAyrsbGpdvpFWfiZkzbfvJNEogd6a86EQ_ubJoC",
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  createOrder={handlePaypalOrderCreate}
                  onApprove={handlePaypalOrderApprove}
                  onError={handlePaypalOrderError}
                  style={{ layout: "vertical" }}
                />
              </PayPalScriptProvider>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;