import React, { useState , useEffect } from 'react';
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
import SuccessModal from '../SuccessModal'; 
import { useDispatch ,useSelector } from 'react-redux';



function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isPasswordValid(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const isValid = passwordRegex.test(password);

  
  return isValid;
}

function SignUp() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email').trim();
    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    const password = data.get('password');
    if (!isPasswordValid(password)) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
 
    dispatch({
      type: 'ADD_USER',
      payload: {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        status: status ? 1 : 0,
      },
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


  const successButton = {
    label: 'go to home page',
    onClick: () => nav('/homepage'),
  };

  const defaultTheme = createTheme();
  const userAdded = useSelector((state) => state.user.userAdded);

  useEffect(() => {
    if (userAdded === 1 || userAdded === 2|| userAdded === 3) {
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
                    control={<Checkbox value="allowExtraEmails" color="primary" onChange={(e)=>setStatus(e.target.checked)}/>}
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
       

      <SuccessModal
        open={showSuccessModal}

        onClose={() => {
          setShowSuccessModal(false);
          if (userAdded === 2) {
            window.location.reload(false);
          }
        }}
        text1={userAdded === 1 ? "Congratulations! 🎉 You have successfully signed up for DevUnity" :
              userAdded === 2 ? "Error: Email already exists. Please use a different email or sign in if you already have an account." :
                                "Error: No Internet Connection. Please check your internet connection and try again."}
        imageSrc={userAdded === 1 ? "/success.gif" :userAdded === 2 ? "error.gif" : "internet.gif"}
        text2= {userAdded === 1 ? "Welcome to our community of developers and innovators. Start exploring and sharing your projects, collaborate with other members, and let your creativity shine! Happy coding! 🚀" :
                userAdded === 2 ? "Please check your credentials and try again." :
                 "Please check your internet connection and try again."}
        button={successButton}
      />
    </>
  );
}

export default SignUp;
