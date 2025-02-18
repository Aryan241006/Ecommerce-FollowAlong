import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [openCheckout, setOpenCheckout] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleCheckout = async () => {
    try {
      await axios.post('http://localhost:5000/api/orders/create',
        { shippingAddress },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      );
      await fetchCart();
      setOpenCheckout(false);
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  };

  if (!cart.items.length) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cart.items.map((item) => (
            <Card key={item.product._id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <img
                      src={`http://localhost:5000/${item.product.image}`}
                      alt={item.product.name}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">{item.product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      ${item.product.price * item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveItem(item.product._id)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Typography variant="h4" color="primary">
                Total: ${calculateTotal()}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => setOpenCheckout(true)}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openCheckout} onClose={() => setOpenCheckout(false)}>
        <DialogTitle>Shipping Address</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="street"
              label="Street Address"
              value={shippingAddress.street}
              onChange={handleAddressChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="city"
              label="City"
              value={shippingAddress.city}
              onChange={handleAddressChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="state"
              label="State"
              value={shippingAddress.state}
              onChange={handleAddressChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="zipCode"
              label="ZIP Code"
              value={shippingAddress.zipCode}
              onChange={handleAddressChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="country"
              label="Country"
              value={shippingAddress.country}
              onChange={handleAddressChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckout(false)}>Cancel</Button>
          <Button onClick={handleCheckout} variant="contained">
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;