
// });
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const profileRoutes = require('./routes/profile');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require("cookie-parser");



const app = express();
const PORT = 8080;
app.use(cookieParser());
app.use(cors({
  origin: 'https://ecommerce-follow-alongg.vercel.app',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

// MongoDB connection
let connection = mongoose.connect(process.env.MONGODB_URI);

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Routes
app.use('/', userRoutes);
app.use('/', uploadRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/orders', orderRoutes);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${PORT}`);
});