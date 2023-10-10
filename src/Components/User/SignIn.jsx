import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { signInUser } from '../../Service/api';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
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
  const [login, setLogin] = useState(loginInitialValues)

  const onValueChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value});
  }
  const navigate = useNavigate(); 

  const loginUser = async () => {
    try {
      let response = await signInUser(login);
      console.log(response);
      localStorage.setItem("userInfo", JSON.stringify(response))
      localStorage.setItem("token", JSON.stringify(response.token))
      localStorage.setItem("user", response.user)
      localStorage.setItem("id", response.id)
      navigate(`/dashboard`)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };


  return (
    // <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ backgroundColor: "#F0FFF0" }}>
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User's Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
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
              style={{ backgroundColor: "#00B000" }}
              sx={{ mt: 3, mb: 2 }}
              onClick={() => loginUser()}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/business/signup" variant="body2">
                  {"Want to become a seller, just click..."}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    // </ThemeProvider>
  );
}