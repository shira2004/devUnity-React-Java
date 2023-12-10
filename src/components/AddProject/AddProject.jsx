import { useNavigate } from 'react-router-dom';
import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Body/Header/Header';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextArea from './TextArea';

function Copyright(props) {}

const defaultTheme = createTheme();

export default function AddProject() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      description: data.get('description'),
      additionalInput: data.get('additionalInput'),
    });
  };

  const nav = useNavigate();

  return (
    <>
      <Header />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Add project
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Project Title"
                name="title"
                autoComplete="project title"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Project Description"
                name="description"
                autoComplete="project description"
              />
              <TextArea text = "hi"/>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
