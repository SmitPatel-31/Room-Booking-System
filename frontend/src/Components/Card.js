import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import './Card.css'; // Import the Card.css file for styling

const CardComponent = ({ data, index,onCardClick }) => {
  return (
    <Card onClick={() => onCardClick(data)} key={index} className="card">
      <CardContent className="card-content">
        <div className="card-facilities">
          {data.facility.map((facility, index) => (
            <FacilityBox key={index} facility={facility} />
          ))}
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              {data.roomNo}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              Capacity: {data.capacity}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const FacilityBox = ({ facility }) => {
  return (
    <div className="facility-box">
      <Typography variant="body2" color="textSecondary">
        {facility}
      </Typography>
    </div>
  );
};

export default CardComponent;
