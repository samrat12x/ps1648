import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

// Create keyframes for the tick animation
const tickAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(45deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(45deg);
  }
`;

const SuccessTick = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* Green tick animation */}
      <Box
        sx={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: '8px solid #4caf50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: `${tickAnimation} 0.8s ease-out`,
        }}
      >
        <Box
          component="span"
          sx={{
            width: '35px',
            height: '70px',
            borderBottom: '8px solid #4caf50',
            borderRight: '8px solid #4caf50',
            transform: 'rotate(45deg)',
            animation: `${tickAnimation} 0.8s ease-out`,
          }}
        />
      </Box>

      {/* Caption */}
      <Typography
        variant="h6"
        sx={{
          marginTop: 2,
          color: '#333',
          fontWeight: 'bold',
        }}
      >
        Booking successful!
      </Typography>

      <Typography variant="subtitle1" sx={{ color: '#555' }}>
        Check your email for details.
      </Typography>

      {/* Go Back Button */}
      <Button
        variant="contained"
        sx={{
          marginTop: 4,
          backgroundColor: '#4caf50',
          ':hover': {
            backgroundColor: '#388e3c',
          },
        }}
        onClick={handleGoBack}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default SuccessTick;
