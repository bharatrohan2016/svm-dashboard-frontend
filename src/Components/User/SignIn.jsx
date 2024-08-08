import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import Link from '@mui/material/Link';
import { Avatar, Button, TextField } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../Service/api';
import { ToastContainer, toast } from 'react-toastify';
import styles from './SignIn.module.css';
function Copyright(props) {
  return (
    <Typography variant="body2" color="#193C34 " align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://bharatrohan.in/">
        BharatRohan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

const loginInitialValues = {
  email: '',
  password: ''
}

export default function SignIn() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInitialValues)
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    // Regular expression for validating an email address
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!login.email.trim() || !login.password.trim()) {
      // Check if either field is empty
      toast.error('Both fields must be filled');
      return;
    }

    if (!validateEmail(login.email)) {
      // Check if the email is in a valid format
      toast.error('Invalid email format');
      return;
    }

    loginUser();
  };
  const loginUser = async () => {
    try {
      const response = await signInUser(login);

      if (response) {
        localStorage.setItem('token', JSON.stringify(response.token));
        navigate(`/select-year`);
        toast.success('Login Successful');
      } else {
        toast.error('Incorrect username or password', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 2,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginDiv}>
      <Container className={styles.loginContainer} component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#193C34 ' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User's Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, color : '#193C34 ' }}>
            <TextField
              margin="normal"
              color="primary"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type='email'
              autoFocus
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onValueChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#193C34 ", height : '50px', borderRadius : '20px' }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
        <ToastContainer/>
      </Container>
      </div>
    // </ThemeProvider>
  );
}
