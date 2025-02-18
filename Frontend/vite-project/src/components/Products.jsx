import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box,
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Snackbar,
  Stack
} from '@mui/material';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const { addToCart } = useCart();
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setSnackbar({ open: true, message: 'Error fetching products' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchProducts();
      setSnackbar({ open: true, message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      setSnackbar({ open: true, message: 'Error deleting product' });
    }
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      setSnackbar({ open: true, message: 'Please login to add items to cart' });
      return;
    }

    try {
      const success = await addToCart(productId, 1);
      if (success) {
        setSnackbar({ open: true, message: 'Item added to cart' });
      } else {
        setSnackbar({ open: true, message: 'Error adding item to cart' });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbar({ open: true, message: 'Error adding item to cart' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Our Products
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3
        }}>
          {products.map((product) => (
            <Card 
              key={product._id} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: 'cover'
                }}
                image={`http://localhost:5000/${product.image}`}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h6" component="h2" sx={{ mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        ${product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stock: {product.stock}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => handleAddToCart(product._id)}
                        disabled={product.stock === 0}
                        sx={{
                          backgroundColor: product.stock === 0 ? 'grey.400' : 'primary.main'
                        }}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                      {isAuthenticated && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(product._id)}
                          sx={{ minWidth: 'auto' }}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default Products;