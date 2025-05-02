// import { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";

// const SelectAddress = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [error, setError] = useState(null);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const userEmail = searchParams.get("userEmail");

//   useEffect(() => {
//     if (!userEmail) {
//       setError("User email not found. Please log in again.");
//       return;
//     }
//     fetchAddresses();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userEmail]);

//   const fetchAddresses = async () => {
//     try {
//       console.log("Fetching addresses for userEmail:", userEmail);
//       const userResponse = await fetch(
//         `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include", // Add this
//         }
//       );
//       console.log("User Response Status:", userResponse.status);
  
//       const userData = await userResponse.json();
//       console.log("User Data:", userData);
  
//       if (!userResponse.ok) {
//         throw new Error(userData.error || "Failed to fetch user data");
//       }
  
//       const userId = userData._id;
  
//       const profileResponse = await fetch(
//         `https://ecommerce-zof6.onrender.com/api/v1/profile/getProfile?userId=${userId}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include", // Add this
//         }
//       );
//       console.log("Profile Response Status:", profileResponse.status);
  
//       const profileData = await profileResponse.json();
//       console.log("Profile Data:", profileData);
  
//       if (!profileResponse.ok) {
//         if (profileResponse.status === 404) {
//           setAddresses([]);
//           setError("No addresses found. Please add an address.");
//         } else {
//           throw new Error(profileData.error || "Failed to fetch profile");
//         }
//       } else {
//         setAddresses(profileData.addresses || []);
//         setError(null);
//       }
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//       setError(error.message || "An error occurred while loading addresses. Please try again later.");
//     }
//   };

//   const handleAddressSelect = (addr) => {
//     setSelectedAddress(addr);
//   };

//   const handleConfirm = () => {
//     if (!selectedAddress) {
//       setError("Please select a delivery address.");
//       return;
//     }
//     navigate(`/order-confirmation?userEmail=${encodeURIComponent(userEmail)}&address=${encodeURIComponent(JSON.stringify(selectedAddress))}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 mt-20">
//       <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Select Delivery Address</h1>

//         {error ? (
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//             <p className="text-red-600 text-lg font-medium">{error}</p>
//             <button
//               onClick={fetchAddresses}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
//             >
//               Retry
//             </button>
//           </div>
//         ) : addresses.length > 0 ? (
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="space-y-4">
//               {addresses.map((addr, index) => (
//                 <div
//                   key={index}
//                   className={`p-4 border rounded-lg cursor-pointer ${selectedAddress === addr ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
//                   onClick={() => handleAddressSelect(addr)}
//                 >
//                   <input
//                     type="radio"
//                     name="address"
//                     checked={selectedAddress === addr}
//                     onChange={() => handleAddressSelect(addr)}
//                     className="mr-2"
//                   />
//                   <p className="text-gray-700">
//                     <strong>Address {index + 1} ({addr.addressType}):</strong>
//                   </p>
//                   <p className="text-gray-600">{addr.street}</p>
//                   <p className="text-gray-600">{addr.state || ""}</p>
//                   <p className="text-gray-600">
//                     {addr.city}, {addr.country}, {addr.zipCode}
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={handleConfirm}
//               className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
//             >
//               Confirm Address
//             </button>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//             <p className="text-gray-500 text-lg">No addresses found. Please add an address from your profile.</p>
//             <button
//               onClick={() => navigate(`/profile?userEmail=${encodeURIComponent(userEmail)}`)}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
//             >
//               Go to Profile
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SelectAddress;

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userEmail = searchParams.get("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("User email not found. Please log in again.");
      setLoading(false);
      return;
    }
    fetchAddresses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  const fetchAddresses = async () => {
    try {
      console.log("Fetching addresses for userEmail:", userEmail);
      const userResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      console.log("User Response Status:", userResponse.status);
  
      const userData = await userResponse.json();
      console.log("User Data:", userData);
  
      if (!userResponse.ok) {
        throw new Error(userData.error || "Failed to fetch user data");
      }
  
      const userId = userData._id;
  
      const profileResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/api/v1/profile/getProfile?userId=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      console.log("Profile Response Status:", profileResponse.status);
  
      const profileData = await profileResponse.json();
      console.log("Profile Data:", profileData);
  
      if (!profileResponse.ok) {
        if (profileResponse.status === 404) {
          setAddresses([]);
          setError("No addresses found. Please add an address.");
        } else {
          throw new Error(profileData.error || "Failed to fetch profile");
        }
      } else {
        setAddresses(profileData.addresses || []);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setError(error.message || "An error occurred while loading addresses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (addr) => {
    setSelectedAddress(addr);
  };

  const handleConfirm = () => {
    if (!selectedAddress) {
      setError("Please select a delivery address.");
      return;
    }
    navigate(`/order-confirmation?userEmail=${encodeURIComponent(userEmail)}&address=${encodeURIComponent(JSON.stringify(selectedAddress))}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Select Delivery Address</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-red-600 text-lg font-medium">{error}</p>
            <button
              onClick={fetchAddresses}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Retry
            </button>
          </div>
        ) : addresses.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {addresses.map((addr, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer ${selectedAddress === addr ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                  onClick={() => handleAddressSelect(addr)}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === addr}
                    onChange={() => handleAddressSelect(addr)}
                    className="mr-2"
                  />
                  <p className="text-gray-700">
                    <strong>Address {index + 1} ({addr.addressType}):</strong>
                  </p>
                  <p className="text-gray-600">{addr.street}</p>
                  <p className="text-gray-600">{addr.state || ""}</p>
                  <p className="text-gray-600">
                    {addr.city}, {addr.country}, {addr.zipCode}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleConfirm}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              Confirm Address
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500 text-lg">No addresses found. Please add an address from your profile.</p>
            <button
              onClick={() => navigate(`/profile?userEmail=${encodeURIComponent(userEmail)}`)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Go to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAddress;