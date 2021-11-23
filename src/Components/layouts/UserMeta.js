import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

const UserMeta = ({ title, text }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" color="text.primary">
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default UserMeta;
