const multer = require("multer"); // Add this line
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecom-product", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Allowed file formats
    // transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional: Resize images
  },
});

const upload = multer({ storage: storage });

module.exports = { upload, cloudinary };