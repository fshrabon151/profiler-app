import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../layouts/MetaData';
import { useAuth } from '../../context/AuthContext';

const theme = createTheme();

const Register = () => {
  const { isAuthenticated, loading, error, loadUser, clearErrors, register } =
    useAuth();
  const alert = useAlert();

  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const { firstName, lastName, phone, email, password } = user;
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/broken-image.jpg');

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
      navigate('/');
    }
  }, [loadUser, isAuthenticated, navigate]);

  if (error) {
    alert.error(error);
    clearErrors();
  }

  const onChange = (e) => {
    if (e.target.name === 'photo') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !phone || !avatar) {
      alert.error('All Field Required');
    } else {
      const formData = new FormData();
      formData.set('firstName', firstName);
      formData.set('lastName', lastName);
      formData.set('phone', phone);
      formData.set('email', email);
      formData.set('password', password);
      formData.set('avatar', avatar);
      register(formData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MetaData title="Register" />
      <Container component="main" maxWidth="xs">
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
            Sign up
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
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  name="lastName"
                  autoComplete="family-name"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={phone}
                  autoComplete="phone"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  id="password"
                  onChange={onChange}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <Avatar src={avatarPreview} sx={{ width: 56, height: 56 }} />
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading ? true : false}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
