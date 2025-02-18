import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { cart } = useCart();
  const isAuthenticated = localStorage.getItem('token');

  // State for mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  // State for profile menu
  const [anchorEl, setAnchorEl] = useState(null);

  const cartItemCount = cart.items?.length || 0;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleProfileMenuClose();
    setMobileOpen(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleProfileMenuClose();
    setMobileOpen(false);
  };

  const menuItems = isAuthenticated ? [
    { text: 'Add Product', icon: <AddCircleIcon />, path: '/add-product' },
    { text: 'Orders', icon: <ReceiptIcon />, path: '/orders' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ] : [
    { text: 'Login', icon: <LoginIcon />, path: '/login' },
    { text: 'Register', icon: <AppRegistrationIcon />, path: '/register' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem 
          button 
          onClick={() => handleNavigation('/')}
          sx={{ py: 2 }}
        >
          <Typography variant="h6" color="primary">
            E-Commerce
          </Typography>
        </ListItem>
        <Divider />
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {isAuthenticated && (
          <>
            <ListItem button onClick={() => handleNavigation('/cart')}>
              <ListItemIcon>
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'primary.main' }}>
        <Toolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            E-Commerce
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    startIcon={<AddCircleIcon />}
                    onClick={() => handleNavigation('/add-product')}
                  >
                    Add Product
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={<ReceiptIcon />}
                    onClick={() => handleNavigation('/orders')}
                  >
                    Orders
                  </Button>
                  <IconButton
                    color="inherit"
                    onClick={() => handleNavigation('/cart')}
                  >
                    <Badge badgeContent={cartItemCount} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{ ml: 1 }}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    startIcon={<LoginIcon />}
                    onClick={() => handleNavigation('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={<AppRegistrationIcon />}
                    onClick={() => handleNavigation('/register')}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleNavigation('/profile')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;