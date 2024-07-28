import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
const BackgroundBox = styled(Box)({
  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const WelcomeContainer = styled(Container)({
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '2rem',
  borderRadius: '1rem',
});

const WelcomePage = () => {
    const navigate=useNavigate()
  return (
    <BackgroundBox>
      <WelcomeContainer maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Messenger X
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          The best place to connect and communicate with your friends.
        </Typography>
        <Grid container spacing={2} justifyContent="center" mt={4}>
          <Grid item>
            <Button variant="contained" color="primary" size="large" onClick={()=>navigate('/dashboard')}>
              Get Started
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" size="large">
              Learn More
            </Button>
          </Grid>
        </Grid>
      </WelcomeContainer>
    </BackgroundBox>
  );
};

export default WelcomePage;
