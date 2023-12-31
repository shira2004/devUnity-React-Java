import React from 'react';
import { Container, Typography } from '@mui/material';

const Video = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <video autoPlay muted loop id="myVideo" style={{ width: '100%' }}>
        <source src="/DevUnity.mp4" type="video/mp4" />
      </video>
      
    </Container>
  );
};

export default Video;
