import React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import Card from '@mui/material/Card';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './layouts/Spinner';
import MetaData from './layouts/MetaData';
import UserMeta from './layouts/UserMeta';

const Home = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <>
      <CssBaseline />

      {loading && user === null ? (
        <Spinner />
      ) : (
        <>
          <Container maxWidth="lg">
            <MetaData title="Home" />
            <Box sx={{ my: 10 }}>
              <Typography variant="h4" component="h2" sx={{ mb: 5 }}>
                My Profile
              </Typography>

              <Grid
                container
                spacing={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgColor: '#e3f2fd',
                }}
              >
                <Grid item xs={12} md={5}>
                  <Card
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      bgcolor: '#eceff1',
                      height: '100%',
                      boxShadow: 0,
                      py: 10,
                    }}
                  >
                    <Avatar
                      src={user && user.avatar.url}
                      sx={{ width: 256, height: 256 }}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Card
                    sx={{
                      padding: 2,
                      pb: 5,
                      bgcolor: '#eceff1',
                      boxShadow: 0,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        textAlign: 'center',
                        my: 3,
                        textTransform: 'capitalize',
                      }}
                    >
                      Metadata
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      sx={{ justifyContent: 'center' }}
                    >
                      <UserMeta title="First Name" text={user.firstName} />
                      <UserMeta title="Last Name" text={user.lastName} />
                      <UserMeta title="Email" text={user.email} />
                      <UserMeta title="Phone" text={user.phone} />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          size="small"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          <Link
                            to="/password-update"
                            style={{
                              textDecoration: 'none',
                              color: 'white',
                              display: 'inline-block',
                              width: '100%',
                            }}
                          >
                            Change Password
                          </Link>
                        </Button>
                        <Box sx={{ width: 25 }}></Box>

                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 3, mb: 2 }}
                        >
                          <Link
                            to="/profile-update"
                            style={{
                              textDecoration: 'none',
                              color: 'white',
                              display: 'inline-block',
                              width: '100%',
                            }}
                          >
                            Update Profile
                          </Link>
                        </Button>
                      </Box>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
