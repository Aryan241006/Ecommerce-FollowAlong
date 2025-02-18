import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Divider,
  Stack,
  Snackbar
} from '@mui/material';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile(prev => ({
        ...prev,
        username: response.data.username,
        email: response.data.email
      }));
    } catch (error) {
      setSnackbar({ open: true, message: 'Error fetching profile' });
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/profile', 
        { username: profile.username, email: profile.email },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      );
      setSnackbar({ open: true, message: 'Profile updated successfully' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating profile' });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (profile.newPassword !== profile.confirmPassword) {
      setSnackbar({ open: true, message: 'New passwords do not match' });
      return;
    }
    try {
      await axios.put('http://localhost:5000/api/users/password',
        {
          currentPassword: profile.currentPassword,
          newPassword: profile.newPassword
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      );
      setProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setSnackbar({ open: true, message: 'Password updated successfully' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating password' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 2, bgcolor: 'primary.main' }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4">
            My Profile
          </Typography>
        </Box>

        <Stack spacing={4}>
          {/* Profile Information */}
          <Box component="form" onSubmit={handleUpdateProfile}>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={profile.username}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
              />
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ alignSelf: 'flex-start' }}
              >
                Update Profile
              </Button>
            </Stack>
          </Box>

          <Divider />

          {/* Change Password */}
          <Box component="form" onSubmit={handleUpdatePassword}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={profile.currentPassword}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={profile.newPassword}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={profile.confirmPassword}
                onChange={handleChange}
              />
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ alignSelf: 'flex-start' }}
              >
                Change Password
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Profile;