import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL+'/getcontacts',{headers:{'Authorization':localStorage.getItem("token")}})
    .then((response)=>console.log(response.data))
  },[])

  return (
    <Container component="main" maxWidth="xs">
      <Box>
        
      </Box>
    </Container>
  );
};

export default Dashboard;
