import React, { useState, useRef } from 'react';
import { Grid, TextField, TextareaAutosize, Button } from '@mui/material';
import '../AddProject.css';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme();

export default function NewChallenge({ onDone }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [helpDescription, setHelpDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const maxCharacters = 240;

  const handleDescriptionChange = (event) => {
    const enteredText = event.target.value;
    setDescription(enteredText.slice(0, maxCharacters));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
     
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="400px">
          <CssBaseline />
          <Box
            sx={{
              width: '100%',
              maxWidth: '400px',
              margin: 'auto',
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <form id="new-challenge">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextareaAutosize
                    fullWidth
                    minRows={3}
                    placeholder="Description"
                    name="description"
                    id="description"
                    onChange={handleDescriptionChange}
                    value={description}
                  />
                  <Typography variant="body2" color="textSecondary" fontSize="0.8rem">
                    {description.length}/{maxCharacters}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextareaAutosize
                    fullWidth
                    minRows={3}
                    placeholder="Where you want help"
                    name="helpDescription"
                    id="helpDescription"
                    value={helpDescription}
                    onChange={(e) => setHelpDescription(e.target.value)}
                  />
                </Grid>

               
                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <Button variant="outlined" color="primary" onClick={handleButtonClick}>
                  <span class="material-symbols-outlined">
                  add_photo_alternate
                  </span>
                  </Button>
                  {selectedImage && (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected Image"
                      style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '200px' }}
                    />
                  )}
                </Grid>

               
              </Grid>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
