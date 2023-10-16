import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { signInUser } from '../../Service/api';
import { ToastContainer, toast } from 'react-toastify';
import styles from './SignIn.module.css';
function Copyright(props) {
  return (
    <Typography variant="body2" color="#242b4d" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://bharatrohan.in/">
        Bharat Rohan
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
    
      if(response){
        console.log("hit1");
        localStorage.setItem("token", JSON.stringify(response.token));
        navigate(`/dashboard`)
        toast.success('Login Successfull')
      }else{
        console.log("hit");
        toast.error("Incorrect username or password",{
          position: toast.POSITION.TOP_CENTER,toastId:2, autoClose : 1000
        })
      }
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
          <Avatar sx={{ m: 1, bgcolor: '#242b4d' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User's Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, color : '#242b4d' }}>
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
              style={{ backgroundColor: "#242b4d", height : '50px', borderRadius : '20px' }}
              sx={{ mt: 3, mb: 2 }}
              onClick={() => loginUser()}
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