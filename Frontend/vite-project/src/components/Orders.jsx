import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip
} from '@mui/material';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order._id}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Order #{order._id.slice(-6)}
                  </Typography>
                  <Chip
                    label={order.status.toUpperCase()}
                    color={getStatusColor(order.status)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {order.items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item._id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1">
                            {item.product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            ${item.price * item.quantity}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" color="primary">
                    Total: ${order.total}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Shipping Address:
                  </Typography>
                  <Typography variant="body2">
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                    <br />
                    {order.shippingAddress.state}, {order.shippingAddress.zipCode}
                    <br />
                    {order.shippingAddress.country}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders;