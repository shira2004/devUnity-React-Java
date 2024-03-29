import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../Header/Header';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../SuccessModal';

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isPasswordValid(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[\x21-\x7E]{8,}$/;
  return passwordRegex.test(password);
}

function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const nav = useNavigate();
  const handlePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };


  const successButton = {
    label: 'go to home page',
    onClick: () => {
      if (userAdded === 2) {
        window.location.reload(false);
      } else {
        setShowSuccessModal(false);
      }
      nav('/homepage');
    },
  };

  const dispatch = useDispatch();

  const handleEmailFocus = () => {
    setEmailError(false);
  };

  const handlePasswordFocus = () => {
    setPasswordError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
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

    dispatch({
      type: 'SIGN_IN',
      payload: {
        email: email,
        password: password,
      },
    });
  };

  const defaultTheme = createTheme();
  const userAdded = useSelector((state) => state.user.userAdded);

  useEffect(() => {
    if (userAdded === 1 || userAdded === 2) {

      setShowSuccessModal(true);
    }
  }, [userAdded]);


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
              Sign in
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError}
                onFocus={handleEmailFocus}
                helperText={emailError ? 'Invalid email address' : ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
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
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={() => nav('/SignUp')}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </ThemeProvider>

      <SuccessModal
        open={showSuccessModal}

        onClose={() => {
          setShowSuccessModal(false);
          if (userAdded === 2) {
            window.location.reload(false);
          }
        }}
        text1={userAdded === 1 ? "Welcome back to DevUnity!" : "User does not exist"}
        imageSrc={userAdded === 1 ? "/success.gif" : "error.gif"}
        text2={userAdded === 1 ? "🚀" : "Please check your credentials and try again."}
        button={successButton}
      />
    </>
  );
}

export default SignIn;
