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

import MetaData from '../layouts/MetaData';
import { useAuth } from '../../context/AuthContext';

const theme = createTheme();

const UpdatePassword = () => {
  const { error, isUpdated, loading, clearErrors, updatePassword } = useAuth();
  const alert = useAlert();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdated) {
      alert.success('Password updated successfully');
      navigate('/');
    }
  }, [alert, isUpdated, navigate]);

  if (error) {
    alert.error(error);
    clearErrors();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('oldPassword', oldPassword);
    formData.set('password', newPassword);
    updatePassword(formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <MetaData title="Update Password" />
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
            Update Password
          </Typography>
          <Box
            component="form"
            enctype="multipart/form-data"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  label="Old Password"
                  type="password"
                  id="oldPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  label="New Password"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
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

export default UpdatePassword;
