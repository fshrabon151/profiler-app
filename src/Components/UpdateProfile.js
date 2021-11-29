import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

import MetaData from './layouts/MetaData';
import { useAuth } from '../context/AuthContext';

const theme = createTheme();

const UpdateProfile = () => {
  const {
    clearErrors,
    loadUser,
    updateProfile,
    error,
    isUpdated,
    loading,
    user,
  } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/broken-image.jpg');
  const alert = useAlert();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (isUpdated) {
      alert.success('User updated successfully');
      navigate('/');
      loadUser();
    }
  }, [alert, loadUser, isUpdated, navigate, user]);
  if (error) {
    alert.error(error);
    clearErrors();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('firstName', firstName);
    formData.set('lastName', lastName);
    formData.set('phone', phone);
    formData.set('email', email);
    formData.set('avatar', avatar);
    updateProfile(formData);
  };

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <ThemeProvider theme={theme}>
      <MetaData title="Update Profile" />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            my: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box
            component="form"
            enctype="multipart/form-data"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <Avatar
                  src={avatarPreview ? avatarPreview : `/broken-image.jpg`}
                  sx={{ width: 56, height: 56 }}
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  accept="image/*"
                  type="file"
                  required
                  name="photo"
                  id="photo"
                  fullWidth
                  onChange={onChange}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => navigate('/')}
              >
                Go back
              </Button>
              <Box sx={{ width: 25 }}></Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading ? true : false}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateProfile;
