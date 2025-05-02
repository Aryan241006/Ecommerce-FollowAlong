

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Home } from "lucide-react"; // Using icons for a modern touch

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate back to homepage after 5 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    // Cleanup timer on unmount to prevent memory leaks
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase. You’ll be redirected to the homepage in{" "}
          <span className="font-semibold text-blue-600">5 seconds</span>.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center mx-auto hover:bg-blue-700 transition-colors duration-300"
        >
          <Home className="w-5 h-5 mr-2" />
          Go to Homepage Now
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;