import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

import { useAlert } from 'react-alert';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  const alert = useAlert();

  const logoutHandler = () => {
    logout();
    alert.success('Logged out successfully.');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'white',
                display: 'inline-block',
              }}
            >
              - Profiler App -
            </Link>
          </Typography>
          {isAuthenticated && (
            <Button color="inherit" variant="outlined" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
