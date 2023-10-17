import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const primary = purple[500]; // #f44336

export default function ErrorPage() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#242b4d',
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button style={{color : 'white', textDecoration : 'underline'}} onClick={() => {token ? navigate('/dashboard') : navigate('/')}}>Back Home</Button>
    </Box>
  );
}