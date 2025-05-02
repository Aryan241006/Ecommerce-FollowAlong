
const Profile = require('../models/profile');
const User = require('../models/user');


const createProfile = async (req, res) => {
    try {
        const { userEmail, profileUrl, address } = req.body;

        console.log("Request Body:", req.body); // Debugging

        if (!userEmail || !profileUrl || !address) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        // Find user by email
        const user = await User.findOne({ email: userEmail });
        console.log("Found User:", user); // Debugging

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if profile already exists
        const existingProfile = await Profile.findOne({ user: user._id });
        console.log("Existing Profile:", existingProfile); // Debugging

        if (existingProfile) {
            return res.status(400).json({ success: false, message: "Profile already exists" });
        }

        // Create profile
        const profile = await Profile.create({
            user: user._id, // Store ObjectId, not email
            profileUrl,
            addresses: [address]
        });

        console.log("Profile Created:", profile); // Debugging
        res.status(201).json({ success: true, profile });

    } catch (err) {
        console.error("Error:", err); // Debugging
        res.status(500).json({ success: false, message: "Error creating profile", error: err.message });
    }
};




const getProfile = async (req, res) => {
    try {
        const { userId } = req.query; // Updated to accept userId instead of userEmail
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Find profile using the userId (ObjectId)
        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        // Fetch the user to get name and email (since profile only stores userId)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return only the necessary fields (name, email, and addresses) for consistency with frontend
        res.status(200).json({
            success: true,
            name: user.name, // Assuming the user model has a name field
            email: user.email,
            addresses: profile.addresses || [], // Ensure addresses is always an array, even if empty
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching profile", error: err.message });
    }
};
module.exports = { createProfile, getProfile };
