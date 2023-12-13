import React from 'react';
import { Container, Typography } from '@mui/material';

const Video = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <video autoPlay muted loop id="myVideo" style={{ width: '100%' }}>
        <source src="/DevUnity.mp4" type="video/mp4" />
      </video>
      {/* <div className="content" style={{ marginTop: '1rem' }}>
        <Typography variant="h4" component="h1">
          Heading
        </Typography>
        <Typography variant="body1" component="p">
          Lorem ipsum...
        </Typography>
      </div> */}
    </Container>
  );
};

export default Video;
