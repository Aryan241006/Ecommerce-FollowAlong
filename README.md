# Project Title:

E-Commerce Application

## Project Overview

This project is a comprehensive e-commerce platform designed to provide a fully functional online shopping experience. It includes features like user authentication, product management, and order handling. The purpose is to build a robust and scalable application that demonstrates full-stack development skills using the MERN stack.

## Key Features

- _REST API Creation_ for user authentication, product management, and order handling.
- _Secure login and registration functionality_ using JWT and password hashing.
- _Structured MongoDB schemas_ for users, products, and orders.
- _Robust server-side logic_ with Node.js and Express.
- _Interactive and responsive user interface_ built with React.

## Tech Stack

- _Frontend_: React.js
- _Backend_: Node.js with Express
- _Database_: MongoDB (using Mongoose for schema design)
- _Deployment_: GitHub Pages (frontend) and Render/Heroku (backend)
- _Additional Tools_: Postman for API testing, JWT for authentication, and bcrypt for password hashing.

## Why This Project

I chose this project because it provides an opportunity to practice and demonstrate a wide range of development skills, including frontend and backend development, database schema design, and secure authentication. Building an e-commerce platform is both challenging and rewarding, as it allows me to explore real-world scenarios and enhance my ability to create scalable web applications.

## Milestone 2:

Implemented a user login page with username and password fields. Styled using Tailwind CSS for a clean, responsive design. Validates input and handles user authentication upon form submission.

## Milestone 3: Server Setup

Set up the server with express for HTTP requests and mongoose for MongoDB. Configured routing and database connections, providing endpoints for user authentication and other functionalities.

## Milestone 4: User Model, Controller, and File Upload

In this milestone, we added user management and file upload functionality:

### Key Points:

1. **User Model**: Created a `User` model for storing user data (name, email, password) in the database.
2. **User Controller**: Built a controller for handling user-related requests (adding and retrieving users).
3. **File Upload**: Integrated **Multer** to handle file uploads, allowing users to upload images to the `uploads/` directory.
4. **Server Updates**: Enhanced `server.js` to support user routes and file upload functionality.
5. **Testing**: Verified file upload using **Postman**, with successful uploads stored in the `uploads/` folder.

# Milestone 5: Building the Sign-Up Page 🌟

## Overview

In this milestone, we focused on creating the **Sign-Up Page** for our application, implementing **form validation**, and adding **routing/navigation** to ensure a smooth and user-friendly registration experience. This milestone is a crucial step in building a functional frontend for user onboarding and improving app navigation.

---

## Goals Achieved 🎯

1. **Sign-Up Page Development**:

   - Designed and developed a clean and responsive UI with input fields for:
     - **Name**
     - **Email**
     - **Password**

2. **Form Validation**:

   - Implemented validation logic to ensure:
     - All fields are filled.
     - The email format is valid.
     - The password meets the minimum length of 6 characters.
   - Displayed error messages for invalid inputs to guide the user.

3. **UI Design Improvements**:

   - Created a visually appealing design with proper colors, spacing, and typography.
   - Added user-friendly elements like clear error messages and styled buttons.

4. **Routing and Navigation**:
   - Added a **Landing Page** with two buttons:
     - **SignUp** button that navigates users to the Sign-Up Page.
     - **Login** button to navigate users to the Login Page.
   - Implemented routing using `useNavigate` from `react-router-dom` to handle page navigation and improve the user experience.

# Milestone 6: Backend API for Signup

## What Was Achieved

1. **Password Encryption**:

   - Used `bcrypt` to hash passwords during the signup process.
   - Stored hashed passwords securely in the database instead of plain text.

2. **User Data Storage**:

   - Saved complete user data, including name, email, and other details, in the database.
   - Ensured sensitive data, like passwords, remained encrypted.

3. **CORS Configuration**:
   - Implemented `cors` to enable secure cross-origin requests for the API.

These steps enhanced the security and functionality of the signup process while ensuring compatibility with frontend requests.

# Milestone 7: User Authentication

## Overview

In this milestone, we focused on implementing user authentication, including user signup and login functionality. We ensured secure password handling and JWT-based authentication for session management.

## Goals Achieved 🎯

1. **User Signup**:

   - Created a `createUser` endpoint to handle user registration.
   - Implemented validation to check if the user already exists.
   - Used `bcryptjs` to hash passwords before storing them in the database.
   - Stored user details securely in the MongoDB database.

2. **User Login**:

   - Created a `loginUser` endpoint to handle user login.
   - Implemented validation to check if the user exists.
   - Used `bcryptjs` to compare the provided password with the stored hashed password.
   - Generated JWT tokens for authenticated sessions using `jsonwebtoken`.
   - Sent JWT tokens to the client upon successful login.

3. **Error Handling**:

   - Implemented comprehensive error handling for both signup and login processes.
   - Returned appropriate HTTP status codes and error messages for different scenarios (e.g., user already exists, invalid password, user not found).

4. **Testing with Postman**:

   - Verified the functionality of the `createUser` and `loginUser` endpoints using Postman.
   - Ensured that the endpoints return the expected responses and handle errors correctly.

5. **Code Refactoring**:

   - Refactored the user controller to improve code readability and maintainability.
   - Ensured that the code follows best practices for security and performance.

## Example Requests

### Signup Request

- **Method**: POST
- **URL**: `https://ecommerce-zof6.onrender.com/signup`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body** (raw JSON):
  ```json
  {
    "name": "Admin",
    "email": "admin@gmail.com",
    "password": "heyguys"
  }
  ```

# Milestone 8: Product Card Component and (styles with gpt)

## Overview

Milestone 8 focuses on designing a reusable product card component and creating a responsive homepage layout to showcase these cards. The aim was to build an organised, visually appealing, and user-friendly interface for displaying product details.

## Achievements 🎯

### 1. Reusable Product Card Component

- Developed a flexible product card component using props to display dynamic product details.
- Each card includes key information such as:
  - **Product Image**: A visually clear representation of the product.
  - **Name**: The product's title.
  - **Price**: The cost displayed prominently.
  - **Description**: A brief overview of the product.

### 2. Responsive Grid Layout

- Designed a homepage layout using Tailwind CSS to arrange product cards in a neat, grid-based structure.
- Ensured responsiveness for an optimal viewing experience across various devices:
  - **Small screens**: Displays cards in a single column.
  - **Medium screens (768px and above)**: Displays cards in two columns.
  - **Large screens (1024px and above)**: Displays cards in four columns.

## Learning Goals 🌟

By completing this milestone, the following objectives were achieved:

- Understanding how to create and style reusable components in frontend development.
- Learning to use Tailwind CSS to implement dynamic, responsive layouts.
- Using array mapping to render multiple cards dynamically with unique product data.

## Why Build Card Components? 🤔

- **Showcase Products Effectively**: Provides a visually appealing way to display product details.
- **Reusable Design**: Easily integrates across multiple pages or sections of the application.
- **Improved User Experience**: Simplifies browsing and interacting with products.
- **Organised Layout**: Ensures the homepage remains clean and structured.

# Milestone 9: Product Form Component

## Overview

In this milestone, we focused on creating a `ProductForm.jsx` component to handle the addition of new products. This form allows users to input product details and upload images, ensuring a user-friendly interface for managing product data.

## Achievements 🎯

### 1. Product Form Component

- Developed a `ProductForm.jsx` component to handle product data input.
- The form includes fields for:
  - **Product Name**: Input field for the product's name.
  - **Description**: Textarea for a brief overview of the product.
  - **Price**: Input field for the product's price.
  - **Category**: Input field for the product's category.
  - **Images**: File input for uploading product images.

### 2. State Management

- Utilized React's `useState` hook to manage form data.
- Implemented dynamic state updates using computed property names:
  ```jsx
  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  ```

# Milestone 10: Product Schema and Endpoint Creation 🚀

### Learning Goals 🎯

- Understand how to write a Mongoose schema for products.
- Create an endpoint to validate and store product details in MongoDB.
- Handle file uploads using `multer` and store image paths in the database.

---

### Key Features Implemented 🛠️

1. **Product Schema:**

   - Defined the structure for `Product` data, including fields like `name`, `description`, `price`, `category`, and `images`.
   - Added proper validation to ensure data integrity.

2. **File Upload Handling:**

   - Configured `multer` to store uploaded images in the `uploads/` folder.
   - Images are saved with a unique timestamp-based naming convention.

3. **Product Creation Endpoint:**

   - Created a `POST /createProduct` endpoint to receive product data.
   - Validated the data fields (`name`, `description`, `price`, `category`, and images).
   - Saved the product details and image paths to MongoDB.

4. **Validation:**
   - Ensured all required fields are provided.
   - Returned an appropriate error response if any field is missing.

---

# Milestone 11 - Display Products Dynamically

## Overview 📌

In this milestone, we made the home page dynamic by fetching product data from MongoDB and displaying it using the **Product Card** component.

## What We Did 🔧

### 1️⃣ Backend - Created an API Endpoint

- We wrote an endpoint `/getProducts` in the backend to fetch all product data from MongoDB.
- The endpoint retrieves product details, including name, description, price, category, and image URLs stored in the database.

### 2️⃣ Storing Product Images

- Images uploaded from the frontend are stored in the `uploads/` folder in the backend.
- Only the image file path is stored in MongoDB.
- We used `multer` for handling file uploads.

### 3️⃣ Frontend - Fetching Data

- We created a function in `ProductCardList` to fetch data from the backend using `fetch("https://ecommerce-zof6.onrender.com/getProducts")`.
- The response is stored in the `products` state using `useState()`.

### 4️⃣ Displaying Products Dynamically

- The fetched product data is mapped and passed to the **Product Card** component.
- The image source is set dynamically using `product.images[0]` (assuming the first image).
- The UI now updates automatically when new products are added to the database.

# Milestone 12: Dynamic Product Display

### Overview

In this milestone, we have successfully implemented the feature to dynamically display products on the frontend based on the stored data in the backend.

### Changes Implemented:

1. **Server-Side Enhancements:**

   - Created a new API endpoint (`/getProducts`) to fetch all products from the database.
   - Used `Product.find()` to retrieve stored product details.
   - Handled errors to ensure smooth API responses.

2. **Client-Side Modifications:**
   - Updated `ProductCardList` component to fetch product data from the backend.
   - Used `useEffect` to make an API call and store the retrieved data in state (`setProducts`).
   - Displayed products dynamically based on the fetched data.

### Code Summary:

#### **Backend (`server/routes/productRoutes.js`)**

```js
const express = require("express");
const {
  createProduct,
  uploadImages,
  getProducts,
} = require("../controllers/productController");
const router = express.Router();

router.post("/createProduct", uploadImages, createProduct);
router.get("/getProducts", getProducts);

module.exports = router;
```

---

# Milestone 13: Edit Uploaded Products

## Overview

In this milestone, we implemented the **Edit Product** functionality, allowing users to modify previously uploaded products. This involved:

- Adding an **Edit** button to each product card.
- Creating an **Edit Product Form** that auto-fills with existing product data.
- Developing a **backend endpoint** to update product details in MongoDB.
- Handling navigation between the product list and the edit form.

---

## 📌 Learning Goals

By the end of this milestone, you will understand:

- How to create an **update endpoint** in Express.js for modifying database entries.
- How to **pre-fill form fields** with existing data for a seamless editing experience.
- How to **send updated product data** from the frontend to the backend and update MongoDB.

---

## 🏗 Steps Implemented

### 1️⃣ Backend: Create the Update Endpoint

We added an endpoint to **fetch a single product** and another to **update product details** in MongoDB.

#### ✅ **Fetch a Single Product**

```javascript
app.get("/getProduct/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});
```

---

# Milestone 14: Delete Product Functionality 🗑️

## Overview

In this milestone, we implemented the delete functionality for products, allowing users to remove products from the database. This feature enhances the product management system by providing a way to handle outdated or unwanted items.

## 📌 Learning Goals

- Understanding DELETE HTTP method implementation in Express.js
- Handling confirmation dialogs for destructive actions
- Managing state and navigation after successful deletions
- Implementing proper error handling for delete operations

## 🏗 Key Features Implemented

### 1️⃣ Backend Development

- Created a delete endpoint to remove products from MongoDB
- Implemented proper error handling and status codes
- Added validation to ensure product exists before deletion
- Configured proper response messages for success/# Milestone 14: Delete Product Functionality 🗑️

# Milestone 15: UI Improvements and Navbar Consistency

In this milestone, we focused on:

1. Unifying the color theme across the navbar and various pages.
2. Ensuring the navbar remains on top with proper z-index.
3. Adjusting layout and padding to fix scrolling issues on the Landing Page.

These changes enhance the user experience by providing a consistent look and feel, improving navigation, and ensuring a responsive layout across different screen sizes.

# 🛍️ Milestone 16: Product Info Page

## 📌 Overview

In this milestone, we create a **Product Info Page** that displays detailed product information, allows users to select a quantity, and provides an **"Add to Cart"** button.

## 🎯 Learning Goals

- Create a new page to display product details.
- Implement a **quantity selector** to choose the number of items.
- Add an **"Add to Cart"** button for users to save products.

## 🛠️ Steps to Implement

### 1️⃣ Create the Product Info Page

- Fetch the product details using its **ID** from the backend.
- Display the **product name, description, price, and images**.
- Add an input field for **selecting quantity**.
- Include an **"Add to Cart"** button.

### 2️⃣ Add Routing for Product Info Page

- Define a new route: `/product/:id`.
- Ensure clicking **"View Details"** navigates to this page.

### 3️⃣ Modify "View Details" Button

- Update the **Product List** page to link each product to its detailed view.

### ✅ Final Outcome

- Users can click **"View Details"** to access full product details.
- They can **select a quantity** before adding an item to the cart.
- The **"Add to Cart"** button saves the selected item.

🎉 **Milestone 16 is complete!**

# ✅ Milestone 17 Completion Report

## 🎯 Objective

Implement the **Add to Cart** functionality in both the frontend and backend.

## 📌 Tasks Completed

- ✅ Created a **POST** endpoint `/addToCart/:productId` to add items to the cart.
- ✅ Fetched `userEmail` from `localStorage` and included it while adding products to the cart.
- ✅ Updated the **cart schema** to store user-specific cart items.
- ✅ Ensured the cart items are stored correctly in **MongoDB**.
- ✅ Successfully tested adding products to the cart.

## 🚀 Outcome

Users can now add products to their cart, and the data is stored in the database for future retrieval.

# ✅ Milestone 18 Completion Report

## 🎯 Objective

Implement a backend endpoint to fetch all products inside a user's cart using their email.

## 📌 Tasks Completed

- ✅ Created a **GET** endpoint `/getCart` to fetch cart items for a user.
- ✅ Modified the **cart schema** to associate items with `userEmail`.
- ✅ Ensured the frontend retrieves `userEmail` from `localStorage` instead of headers.
- ✅ Successfully tested **adding to cart** and fetching cart items via API.

## 🚀 Outcome

The cart functionality is now fully integrated, allowing users to view their cart items based on their email.

# **Milestone 19: Progress Summary**

## **1️⃣ Backend Setup**

- ✅ **Folder Structure**: Organized into `controllers`, `routes`, `models`, etc.
- ✅ **Database**: Using **MongoDB (with Mongoose)** for storing user and cart data.
- ✅ **Authentication**: Implemented using **Supabase Auth**.
- ✅ **API Endpoints**:
  - `POST /addToCart/:productId` → Add items to the cart.
  - `POST /removeFromCart/:productId` → Remove or decrease item quantity.
  - `GET /getCart` → Fetch the user's cart.
  - with quantity update adn delete cart item

## **2️⃣ Frontend Setup**

- ✅ **Framework**: React with functional components.
- ✅ **State Management**: Using `useState` and `useEffect`.
- ✅ **Cart Functionality**:
  - **Add to Cart**: Works correctly, updates frontend and backend.
  - **Increase Quantity**: Uses `addToCart` API and updates properly.
  - **Decrease Quantity**: Uses `removeFromCart` API (currently under testing).
  - **Fetch Cart**: Retrieves cart items on page load.

# **Milestone 20: Progress Summary**

## **1️⃣ Backend Setup**

- ✅ **Folder Structure**: Maintained and extended existing structure (`controllers`, `routes`, `models`, etc.) for profile functionality.
- ✅ **Database**: Using **MongoDB (with Mongoose)** to store and retrieve user `name` and `email`.
- ✅ **API Endpoints**:
  - `GET /getUserByEmail` → Fetches user profile data (name and email) based on `userEmail` query parameter, with error handling (404, 400, 500).

## **2️⃣ Frontend Setup**

- ✅ **Framework**: React with functional components.
- ✅ **State Management**: Using `useState` and `useEffect` for profile data.
- ✅ **Profile Functionality**:
  - **Fetch Profile**: Retrieves and displays user `name` and `email` from backend.
  - **Error Handling**: Manages loading states and errors (e.g., 404, 500).
  - **Local Storage**: Uses `localStorage.getItem("userEmail")` for profile fetching.


  # **Milestone 21: Progress Summary**

## **1️⃣ Backend Setup**

- ✅ **Endpoint Update**: Modified the **GET /getUserByEmail** endpoint to include the user’s `_id` in the response, ensuring the frontend can fetch profiles using the user’s ObjectId.
  - **Input**: `userEmail` (e.g., `admin11@gmail.com`)
  - **Output**: JSON response with `{ name, email, _id }` (e.g., `{"name": "admin", "email": "admin11@gmail.com", "_id": "someObjectId123"}`).
  - **Changes**:
    - Updated the response object in `getUserByEmail` to include `thisUser._id`.
    - Maintained existing error handling (400 for missing email, 404 for user not found, 500 for server errors).
  - **Purpose**: Enables the frontend to retrieve the user’s `_id` and use it to fetch the profile and addresses via the `/getProfile` endpoint.

## **2️⃣ Frontend Setup**

- ✅ **Profile Functionality**: Ensured the `Profile` component correctly fetches the user’s `_id` using `/getUserByEmail`, then uses it to query `/getProfile` to display stored addresses or show the "Add Address" button if no profile exists.
  - **Improvements**:
    - Added checks for `userEmail` in `localStorage` to prevent `undefined` errors.
    - Used `encodeURIComponent` to handle special characters in `userEmail`.
    - Maintained robust error handling and console debugging for tracking issues.
  - **Outcome**: Resolved the 400 (Bad Request) error where `userId` was `undefined`, ensuring the profile page dynamically displays addresses or prompts for adding a new address.

## **3️⃣ Key Achievements**

- Successfully fixed the issue where the frontend couldn’t fetch profile data due to missing `_id` in the `/getUserByEmail` response.
- Improved data consistency between backend and frontend, enabling seamless profile and address management.
- Maintained the professional e-commerce styling and user experience with Tailwind CSS.

# **Milestone 22: Progress Summary**

## **1️⃣ Backend Setup**

- ✅ **Endpoint**: Created **POST /api/v1/profile/addAddress** to save addresses in the user’s profile.
  - **Input**: `userId` and `address` (e.g., `{ street, city, state, zipCode, country, addressType }`).
  - **Output**: `{ success: true, profile }` or error (400, 404, 500).
  - **Functionality**: Adds address to `addresses` array in `Profile` collection.

## **2️⃣ Frontend Setup**

- ✅ **Integration**: Updated `Profile` component to use `/addAddress` for saving addresses via the modal form.

## **3️⃣ Key Achievements**

- Implemented backend address storage, ensuring profile data persistence.
- Maintained seamless frontend-backend integration for address management.

# **Milestone 23: Progress Summary**



- ✅ **Select Address Page**: Created a new `SelectAddress` component to display and select delivery addresses.
  - **Features**:
    - Added a "Place Order" button in the `Cart` component that navigates to `/select-address` with `userEmail` as a parameter (e.g., `/select-address?userEmail=${userEmail}`).
    - Fetches all addresses for the user using `userEmail` to get `_id`, then queries `/api/v1/profile/getProfile?userId=${userId}`.
    - Displays addresses in a list with radio buttons for selection, showing `street`, `city`, `state`, `zipCode`, `country`, and `addressType`.
    - Includes a "Confirm Address" button to proceed to the order confirmation page, passing the selected address and `userEmail`.
  - **Styling**: Used Tailwind CSS for a professional, responsive design (cards, buttons, lists).



# **Milestone 24: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Select Address Page**: Built a `SelectAddress` component to display and select delivery addresses.
  - Added a "Place Order" button in the `Cart` component, navigating to `/select-address?userEmail=${userEmail}`.
  - Fetches addresses using `userEmail` to get `_id`, then queries `/api/v1/profile/getProfile`.
  - Displays addresses with radio buttons for selection, including `street`, `city`, `state`, `zipCode`, `country`, and `addressType`.
  - Includes a "Confirm Address" button to proceed to `/order-confirmation` with the selected address.

## **2️⃣ Backend Setup**

- ✅ **No Changes**: Leveraged existing endpoints (`/getUserByEmail`, `/getProfile`) for address retrieval.

## **3️⃣ Key Achievements**

- Created a user-friendly address selection page for order placement.
- Integrated seamlessly with the cart and profile systems.

# **Milestone 25: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Order Confirmation Page**: Developed an `OrderConfirmation` component to display order details.
  - Displays cart products (name, quantity, price) fetched via `/getCart`.
  - Shows the selected delivery address from `SelectAddress`.
  - Displays the total cart value (subtotal).
  - Includes a "Place Order" button to send order data to `/api/v1/orders/create`.

## **2️⃣ Backend Setup**

- ✅ **Order Endpoint**: Prepared for backend integration with `POST /api/v1/orders/create` to save orders (schema from Milestone 23).

## **3️⃣ Key Achievements**

- Built an order confirmation page for a seamless checkout experience.
- Integrated cart, address, and order details for end-to-end order placement.

# **Milestone 26: Progress Summary**

## **1️⃣ Backend Setup**

- ✅ **Endpoint Update**: Modified **GET /api/v1/orders/user-orders** to accept `userEmail` and retrieve user orders.
  - **Input**: `userEmail` (e.g., `admin11@gmail.com`) as a query parameter.
  - **Output**: `{ success: true, orders }` with all orders for the user, populated with product details, or error (400, 404, 500).
  - **Changes**:
    - Updated `getUserOrders` to fetch the user’s `_id` using `userEmail`, then retrieve orders using that `_id`.
    - Maintained population of product details and sorting by `createdAt`.

## **2️⃣ Frontend Setup**

- ✅ **No Changes**: Leveraged existing `userEmail` from `localStorage` to call `/api/v1/orders/user-orders` for order history or user dashboards.

## **3️⃣ Key Achievements**

- Enabled fetching user orders using email, improving order history accessibility.
- Ensured seamless integration with existing backend and frontend systems.

# **Milestone 27: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **My Orders Page**: Created a `MyOrders` component to display all user orders.
  - Uses `userEmail` from `localStorage` to fetch `_id` via `/getUserByEmail`.
  - Sends GET request to `/api/v1/orders/user-orders` with `_id` to retrieve orders.
  - Displays orders with details (ID, status, date, products, address, total) in a responsive, styled list.
  - Added loading, error, and no-orders states with retry and navigation options.
  - Integrated `MyOrders` link in the navbar for navigation.

## **2️⃣ Backend Setup**

- ✅ **No Changes**: Leveraged existing **GET /api/v1/orders/user-orders** endpoint to fetch user orders using `_id`.

## **3️⃣ Key Achievements**

- Built a user-friendly order history page for viewing past orders.
- Enhanced navigation with a dedicated “My Orders” link in the navbar.

# **Milestone 28: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **My Orders Page Update**: Enhanced the `MyOrders` component to include a "Cancel Order" button for each order.
  - Added the button for non-canceled orders (e.g., `pending`, `shipped`, `delivered`), hidden for canceled orders.
  - Implemented cancellation logic via a PUT request to `/api/v1/orders/cancel/:orderId`, updating the UI dynamically.

## **2️⃣ Backend Setup**

- ✅ **Cancel Endpoint**: Created **PUT /api/v1/orders/cancel/:orderId** in `orderController.js` and `orderRoutes.js`.
  - Accepts `orderId` as a parameter, checks if the order exists and isn’t already canceled, then updates `status` to `cancelled`.
  - Returns `{ success: true, message: "Order canceled successfully" }` or appropriate errors (400, 404, 500).

## **3️⃣ Key Achievements**

- Enabled users to cancel placed orders directly from the `MyOrders` page.
- Ensured seamless integration between frontend and backend for order cancellation.

# **Milestone 29: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Order Confirmation Update**: Modified `OrderConfirmation` component to include navigation to a payment options page.
  - Added logic to navigate to `/payment-options` when "Place Order" is clicked.
  - Passes order details (`userEmail`, `cartItems`, `subtotal`, `selectedAddress`) as state for the next page.
  - Maintained existing styling and structure, deferring payment method selection to a new page.

## **2️⃣ Backend Setup**

- ✅ **No Changes**: Leveraged existing endpoints (`/getUserByEmail`, `/getCart`, `/api/v1/orders/create`) for order preparation.

## **3️⃣ Key Achievements**

- Prepared `OrderConfirmation` to transition to a dedicated payment options page.
- Ensured seamless data transfer for payment processing in the next milestone.

# **Milestone 30: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Payment Options Page**: Created a `PaymentOptions` component to handle payment methods.
  - Receives order details (`userEmail`, `cartItems`, `subtotal`, `selectedAddress`) from `OrderConfirmation` via `useLocation`.
  - Added radio buttons for "Cash on Delivery (COD)" and "Online Payment" selection.
  - Integrated PayPal payments using `@paypal/react-paypal-js` (`PayPalScriptProvider`, `PayPalButtons`) for Online Payment.
  - Saves the order via `/api/v1/orders/create` after successful payment (PayPal or COD).
  - Navigates to `/order-success` after order placement with a 5-second delay.

## **2️⃣ Backend Setup**

- ✅ **No Changes**: Leveraged existing `/getUserByEmail` and `/api/v1/orders/create` endpoints for order placement.

## **3️⃣ Key Achievements**

- Implemented PayPal payment integration for online payments in the sandbox environment.
- Enabled COD and Online Payment options with seamless order placement.

# **Milestone 31: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Redux Installation**: Installed the `react-redux` npm package for global state management.
- ✅ **Store Folder Creation**: Created a `store` folder in the `client` directory with `store.js` and `userActions.js` files.
- ✅ **Global State Configuration**: Configured a Redux store in `store.js` with a `userReducer` to manage the user’s email state.
- ✅ **Action Creator**: Defined a `setEmail` function in `userActions.js` to update the email in the global state.
- ✅ **Provider Integration**: Wrapped the `App` component with the `Provider` component in `main.jsx`, passing the store as a prop.

## **2️⃣ Backend Setup**

- ✅ **No Changes**: Leveraged existing frontend structure without backend modifications.

## **3️⃣ Key Achievements**

- Successfully set up Redux to manage the user’s email as a global state, accessible across components like `OrderConfirmation`, `PaymentOptions`, and `MyOrders`.
- Established a foundation for centralized state management in the e-commerce application.

# **Milestone 32: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Dispatch Email in Login**: Updated the `Login` page to use `useDispatch` from `react-redux` to dispatch the `setEmail` action, storing the user’s email in the global state after a successful login.
- ✅ **Access Email with useSelector**: Modified `OrderConfirmation`, `PaymentOptions`, and `MyOrders` pages to access the user’s email from the Redux store using `useSelector`, replacing previous methods (`localStorage`, URL params, or navigation state).
- ✅ **Removed Redundant Email Storage**: Removed `localStorage` usage for storing the email in `Login` and other pages, relying entirely on Redux for email management.

## **2️⃣ Backend Setup**

- ✅ **No Changes**: Leveraged existing endpoints (`/login`, `/getCart`, `/getUserByEmail`, `/api/v1/orders/create`) without modifications.

## **3️⃣ Key Achievements**

- Successfully used Redux to store and access the user’s email across the application, ensuring consistent state management.
- Eliminated dependency on `localStorage` and URL params for email access, improving security and maintainability.

# **Milestone 32: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Dispatch Email in Login**: Updated the `Login` page to use `useDispatch` to dispatch the `setEmail` action, storing the user’s email in the Redux global state upon successful login.
- ✅ **Access Email with useSelector**: Modified pages to retrieve the email from the Redux store using `useSelector`:
  - Updated `OrderConfirmation` to replace `searchParams.get("userEmail")` with `useSelector((state) => state.user.email)`, adding a redirect to `/login` if the email is `null`.
  - Ensured `PaymentOptions` and `MyOrders` (previously updated) also use `useSelector` for email access.
- ✅ **Removed Redundant Storage**: Eliminated `localStorage` usage for email in `Login` and replaced it with Redux, retaining `localStorage` for the token.

## **2️⃣ Backend Setup**

- ✅ **No Changes**: Continued using existing endpoints (`/login`, `/getCart`, `/getUserByEmail`, `/api/v1/orders/create`) without modifications.

## **3️⃣ Key Achievements**

- Successfully implemented Redux to manage and access the user’s email across the application, enhancing state consistency.
- Added authentication checks in `OrderConfirmation` to redirect unauthenticated users to the login page.
- Improved security and maintainability by centralizing email management in Redux.

# **Milestone 33: Progress Summary**

## **1️⃣ Frontend Setup**

- ✅ **Updated Login Page**: Modified `Login.jsx` to remove `localStorage.setItem` for both `userEmail` and `token`, relying on Redux (`setEmail`) and the backend-sent cookie (`authToken`).
- ✅ **No Additional Changes**: Ensured compatibility with the new backend cookie-based authentication.

## **2️⃣ Backend Setup**

- ✅ **Installed jsonwebtoken**: Added the `jsonwebtoken` package to the server using NPM.
- ✅ **JWT Token Creation**: Updated `loginUser` in `userController.js` to use `jwt.sign` to create a token with `email` and `_id`, signed with `process.env.JWT_SECRET` or a fallback secret.
- ✅ **Set Expiration Time**: Configured the token with `expiresIn: "1h"` and set `maxAge: 3600000` (1 hour) for the cookie.
- ✅ **Added Cookie to Response**: Implemented `res.cookie` to send the `authToken` with `httpOnly`, `secure` (in production), and `sameSite: "strict"` options for security.

## **3️⃣ Key Achievements**

- Successfully implemented JWT-based authentication, storing the token securely as a cookie instead of `localStorage`.
- Centralized email management in Redux, removing redundant `localStorage` usage.
- Enhanced security with `httpOnly` cookies to prevent client-side access.

-# **Milestone 34: Cookie-Based Authentication Setup**

## **1️⃣ Backend Setup**

- ✅ **Created Authentication Middleware**: Added `authenticateToken` middleware in `server/middleware/auth.js` to validate the `authToken` cookie using `jsonwebtoken`, attaching decoded user data (email, id) to `req.user`.
- ✅ **Updated Login to Set Cookie**: Modified `loginUser` in `userController.js` to set the `authToken` cookie with `httpOnly: true`, `maxAge: 3600000` (1 hour), `secure: false` (local testing), and `sameSite: "none"` to handle cross-site requests.
- ✅ **Protected Routes**: Applied `authenticateToken` middleware to routes like `/api/getCart` (routes/cart.js) and `/api/v1/profile/getProfile` (routes/profile.js) to ensure only authenticated users can access them.
- ✅ **Profile Feature Implementation**: Updated `profileController.js` to use `req.user.id` for fetching or creating profiles, eliminating the need for query parameters in `/getProfile` and `/create` endpoints.
- ✅ **Server Configuration**: Added `cookie-parser` middleware in `server.js` and configured CORS with `credentials: true` to allow cookie transmission.

## **2️⃣ Frontend Setup**

- ✅ **Updated Fetch Requests**: Added `credentials: "include"` to all fetch calls (e.g., in `Login.jsx`, `ProfileComponent.jsx`) to send the `authToken` cookie with requests to protected routes.
- ✅ **Profile Component**: Created `ProfileComponent.jsx` to fetch or create a user profile using `/api/v1/profile/getProfile` and `/create`, displaying profile data (name, email, addresses).
- ✅ **Redux Persistence**: Added `redux-persist` to `store.js` to persist the user's email (`state.user.email`) across page refreshes, ensuring seamless state management.
- ✅ **Error Handling**: Updated `fetchProfile` to handle 401/403 errors by redirecting to the login page if the user is unauthorized.

## **3️⃣ Key Achievements**

- Successfully implemented cookie-based authentication, securing protected routes with the `authToken` cookie.
- Enhanced user experience by persisting the email in Redux across refreshes using `redux-persist`.
- Demonstrated practical application with a profile feature, allowing users to manage their profiles securely.
- Improved security by using `httpOnly` cookies and middleware-based authentication, preventing unauthorized access.

# **Milestone 35: Project Deployment**

**In this milestone, we successfully deployed both the frontend and backend components of our e-commerce application to production environments.**

**Frontend deployed at:** https://ecommerce-follow-alongg.vercel.app/

**Backend deployed at:** https://ecommerce-zof6.onrender.com