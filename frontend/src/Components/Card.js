import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import './Card.css'; // Import the Card.css file for styling

const CardComponent = ({ data, index, onCardClick }) => {
  const [imageUrl, setImageUrl] = useState(null);

  
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/images/${data.Img}`);
        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setImageUrl(imageUrl);
        } else {
          console.error('Failed to fetch image.');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImageUrl();
    console.log(imageUrl)
  }, [data.Img]);
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
        <div>
          {imageUrl && <img src={imageUrl} alt="Room Image" width={50} height={50} />}
        </div>
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
