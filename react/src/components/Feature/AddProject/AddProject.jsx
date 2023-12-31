import React from 'react';
import { Grid, TextField, TextareaAutosize, Button } from '@mui/material';
import './AddProject.css';
import images from './image/images';
import Header from '../../Header/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme();

export default function NewChallenge({ onDone }) {
  return (
    <> 
      <Header />

      <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="400px">
          <CssBaseline />
          <Box
              sx={{
                width: '100%',
                maxWidth: '400px', // Adjust this value as needed
                margin: 'auto',    // Center the box horizontally
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Typography component="h1" variant="h5">
              Add Project
            </Typography>
            <form id="new-challenge">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Title" name="title" id="title" />
                </Grid>

                <Grid item xs={12}>
                  <TextareaAutosize
                    fullWidth
                    minRows={3}
                    placeholder="Description"
                    name="description"
                    id="description"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextareaAutosize
                    fullWidth
                    minRows={3}
                    placeholder="where you want help"
                    name="description"
                    id="description"
                  />
                </Grid>


                <Grid item xs={12}>
                  <TextField fullWidth type="url"  />
                </Grid>
                <Grid item xs={12}>
  <ul id="new-challenge-images">
    {images.map((image) => (
      <li key={image.alt}>
        <Typography variant="body2" color="textSecondary" fontSize="0.8rem" gutterBottom>
          {image.alt}
        </Typography>
        <img {...image} />
      </li>
    ))}
  </ul>
</Grid>


                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={onDone}>
                    Add Project
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
