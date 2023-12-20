import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from '../../Header/Header';
import axios from 'axios';

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isPasswordValid(password) {
  // Check that the password contains at least 6 characters, letters, and numbers
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[\x21-\x7E]{6,}$/;
  return passwordRegex.test(password);
}
function SignUp() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const email = data.get('email').trim(); // Trim leading and trailing spaces
    if (!isEmailValid(email)) {
      setEmailError(true);
      console.error('Invalid email address');
      return;
    }
    setEmailError(false);
  
    const password = data.get('password');
    if (!isPasswordValid(password)) {
      setPasswordError(true);
      console.error('Invalid password');
      return;
    }
    setPasswordError(false);
  
    axios
      .post('http://localhost:8585/api/users/createUser', {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
      })
      .then((response) => {
        // Check the response status or any other indicator of successful user creation
        if (response.status === 200) {
          console.log('User created successfully:', response.data);
          // Redirect to /HomePage after successful submission
          nav('/HomePage');
        } else {
          console.error('Error creating user:', response.data);
          // Handle error, show user feedback, etc.
        }
      })
      .catch((error) => {
        console.error('An error occurred during the user creation request:', error);
        // Handle error, show user feedback, etc.
      });
  };
  

  const handleEmailFocus = () => {
    setEmailError(false);
  };

  const handlePasswordFocus = () => {
    setPasswordError(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const defaultTheme = createTheme();

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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                    onFocus={handleEmailFocus}
                    helperText={emailError ? 'Invalid email address' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    error={passwordError}
                    onFocus={handlePasswordFocus}
                    helperText={
                      passwordError
                        ? 'Invalid password'
                        : 'Password must contain at least 8 characters, including letters and numbers'
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleTogglePassword}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={emailError || passwordError}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link variant="body2" onClick={() => nav('/SignIn')}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default SignUp;
