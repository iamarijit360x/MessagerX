import { useState } from 'react';
import { TextField, Button, Container, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../Middleware/AuthContex';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signin } from '../../Actions/authActions';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const theme=useTheme()
  const navigate=useNavigate()
  const {login}=useAuth()
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle sign-in logic here
    const username=email
    const response=await signin(username,password)
      if(response.status===200)
       { 
        
          login(response.token)
          localStorage.setItem("username",email)


       }
    
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Box
  sx={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingX:2
  }}
>
    <Container component="main" maxWidth="xs"
      sx={{
        paddingX:2,
        paddingY:7,
        minHeight:'80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        border:"1px solid",
        borderColor:theme.palette.primary.text,
        borderRadius:"10px",
        backgroundColor:theme.palette.primary.background
      
      }}
    >
      
      <Typography component="h1" variant="h5" color='primary'>
            MessengerX
      </Typography>
      
      <Typography  variant="h6">
          Welcome to Messanger X
      </Typography>
        
      <Box
        sx={{
       
          paddingX:2,
          minHeight:'100%',
          marginTop:5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent:'center',
          alignItems: 'center'
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 ,width:'110%'}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
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
            color="primary"
            sx={{ mt:3, mb: 0 }}
          >
            Sign In
          </Button>

          <Box sx={{textAlign:'center',cursor:'pointer',mt:4}}onClick={() => navigate('/signup')}>Don't have an account? Create one</Box>

        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default SignIn;
