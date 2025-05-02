

const Product = require("../models/product");
const multer = require("multer");
const { upload, cloudinary } = require("../cloudinaryConfig");

// Middleware to upload images to Cloudinary
const uploadImages = upload.array("images");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, userEmail } = req.body;

    if (!name || !description || !price || !category || !req.files || !userEmail) {
      return res.status(400).json({ message: "All fields, images, and user email are required" });
    }

    // Upload images to Cloudinary and get their URLs
    const imageUrls = [];
    for (const file of req.files) {
      try {
        const result = await cloudinary.uploader.upload(file.path); // Upload each file
        imageUrls.push(result.secure_url); // Store the secure URL
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Error uploading images" });
      }
    }

    // Create a new product with Cloudinary image URLs
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images: imageUrls,
      userEmail,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating product" });
  }
};

const getProducts = async (req, res) => {
  try {
    // const { email } = req.query;

    // if (!email) {
    //   return res.status(400).json({ error: "Email is required" });
    // }

    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete images from Cloudinary
    for (const imageUrl of deletedProduct.images) {
      try {
        const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(`ecommerce-products/${publicId}`);
      } catch (deleteError) {
        console.error("Cloudinary delete error:", deleteError);
      }
    }
        
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

module.exports = { createProduct, uploadImages, getProducts, updateProduct, getProductById, deleteProduct };