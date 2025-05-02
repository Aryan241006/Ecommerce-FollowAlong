import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    addressType: "home",
  });
  const userEmail = useSelector((state) => state.user.email);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    if (!userEmail) {
      console.error("No userEmail found in localStorage");
      setProfile(null);
      setError("User email not found. Please log in again.");
      return;
    }
  
    try {
      // Fetch user _id and details by email
      const userResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const userData = await userResponse.json();
  
      if (!userResponse.ok) {
        throw new Error(userData.error || "Failed to fetch user data");
      }
  
      const userId = userData._id;
  
      if (!userId) {
        throw new Error("User ID not found in response");
      }
  
      // Fetch profile using the user _id
      const profileResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/api/v1/profile/getProfile?userId=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const profileData = await profileResponse.json();
  
      if (!profileResponse.ok) {
        if (profileResponse.status === 404) {
          // No profile exists, create a new one
          const createProfileResponse = await fetch(
            `https://ecommerce-zof6.onrender.com/api/v1/profile/create`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userEmail,
                profileUrl: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st%3D1740718796~exp%3D1740722396~hmac%3Dd1e981455ca74dbd2b655c7fb6182e3c27f5df6818093d5c565f9687fa9bf82e&w=740",
                address: {
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "",
                  addressType: "home",
                },
              }),
              credentials: "include", // Fixed here
            }
          );
  
          const createProfileData = await createProfileResponse.json();
  
          if (!createProfileResponse.ok) {
            throw new Error(createProfileData.error || "Failed to create profile");
          }
  
          // Fetch the newly created profile
          const newProfileResponse = await fetch(
            `https://ecommerce-zof6.onrender.com/api/v1/profile/getProfile?userId=${userId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include", // Fixed here
            }
          );
  
          const newProfileData = await newProfileResponse.json();
  
          if (!newProfileResponse.ok) {
            throw new Error(newProfileData.error || "Failed to fetch profile after creation");
          }
  
          // Set the profile data in the state
          setProfile({
            name: userData.name,
            email: userData.email,
            addresses: newProfileData.addresses || [],
          });
        } else {
          throw new Error(profileData.error || "Failed to fetch profile");
        }
      } else {
        // Profile exists, set the profile data
        setProfile({
          name: profileData.name,
          email: profileData.email,
          addresses: profileData.addresses || [],
        });
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
      setError(error.message || "An error occurred while loading your profile. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      console.error("No userEmail found in localStorage");
      setError("User email not found. Please log in again.");
      return;
    }

    try {
      // Fetch user _id to use in the profile creation/update
      const userResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const userData = await userResponse.json();
      const userId = userData._id;

      if (!userResponse.ok) {
        throw new Error(userData.error || "Failed to fetch user data");
      }

      if (!userId) {
        throw new Error("User ID not found in response");
      }

      // Fetch the existing profile
      const profileResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/api/v1/profile/getProfile?userId=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const profileData = await profileResponse.json();

      let updatedAddresses = [];
      if (profileResponse.ok) {
        // If profile exists, add the new address to the existing addresses
        updatedAddresses = [...(profileData.addresses || []), address];
      } else if (profileResponse.status === 404) {
        // If profile doesn't exist, create a new array with the new address
        updatedAddresses = [address];
      } else {
        throw new Error(profileData.error || "Failed to fetch profile");
      }

      // Create or update the profile with the new addresses
      const createProfileResponse = await fetch(
        `https://ecommerce-zof6.onrender.com/api/v1/profile/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail,
            profileUrl: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st%3D1740718796~exp%3D1740722396~hmac%3Dd1e981455ca74dbd2b655c7fb6182e3c27f5df6818093d5c565f9687fa9bf82e&w=740", // Placeholder or actual URL
            address: updatedAddresses[updatedAddresses.length - 1], // Send the latest address
          }),
        }
      );

      const createProfileData = await createProfileResponse.json();
      if (!createProfileResponse.ok) {
        throw new Error(createProfileData.error || "Failed to create/update profile");
      }

      console.log("Address added/updated successfully:", createProfileData);
      setIsModalOpen(false);
      setAddress({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        addressType: "home",
      });
      fetchProfile(); // Refresh profile to show the new address
    } catch (error) {
      console.error("Error submitting address:", error);
      setError("An error occurred while adding the address. Please try again later.");
    }
  };

  return (
    <div className="profile-container min-h-screen bg-gray-50 mt-20">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">My Profile</h1>

        {profile ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Profile Information Section */}
            <div className="profile-info flex flex-col items-center mb-8">
              <img
                src={
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st%3D1740718796~exp%3D1740722396~hmac%3Dd1e981455ca74dbd2b655c7fb6182e3c27f5df6818093d5c565f9687fa9bf82e&w=740"
                }
                alt="Profile Avatar"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-100 shadow-sm"
              />
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-4">
                {profile.name}
              </h2>
              <p className="text-gray-600 mt-2 text-lg">{profile.email}</p>
            </div>

            {/* Address Section */}
            <div className="profile-address mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h3>
              {profile.addresses && profile.addresses.length > 0 ? (
                <div className="space-y-4">
                  {profile.addresses.map((addr, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
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
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                  >
                    Add New Address
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-500 mb-4 text-base">
                    No address data available. Please add an address to continue shopping.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                  >
                    Add Address
                  </button>
                </>
              )}
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-red-600 text-lg font-medium">{error}</p>
            <button
              onClick={fetchProfile}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500 text-lg">Loading your profile...</p>
          </div>
        )}

        {/* Address Input Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add New Address</h2>
              <form onSubmit={handleSubmitAddress} className="space-y-4">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Street Address (Address 1)
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={address.street}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="address2" className="block text-sm font-medium text-gray-700">
                    Apartment/Suite (Address 2) (Optional)
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={address.country}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">
                    Address Type
                  </label>
                  <select
                    id="addressType"
                    name="addressType"
                    value={address.addressType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;