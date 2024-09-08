import { useState } from 'react';
import { TextField, Button, Container, Box, Typography, IconButton, InputAdornment, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../Middleware/AuthContex';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signin } from '../../Actions/authActions';
import logo from '../../assets/logo.png'
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState(null);

  const theme=useTheme()
  const navigate=useNavigate()
  const {login}=useAuth()
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    setError(null)
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Email validation: simple regex for checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (e) => {
    setError(null)
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Password validation: minimum 8 characters
    if (newPassword.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username=email
    const response=await signin(username,password)
      if(response.status===200)
       { 
          login(response.token)
          localStorage.setItem("username",email)
       }

       else{
          setError(response.message)
          setEmail('')
          setPassword('')
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
        maxHeight:'100%',
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
      <img src={logo} width={'100%'} />
      
      
      <Typography  fontWeight={'bold'} variant="h6">
          Login
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
            error={emailError}
            helperText={emailError ? "Enter Valid Email" : ""}
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
            error={passwordError}
            helperText={passwordError ? "Password must be at least 8 characters" : ""}
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
            disabled={emailError || passwordError}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt:3, mb: 0 }}
          >
            Sign In
          </Button>
          {error && <Alert sx={{mt:2}}  severity="error">{error}</Alert>}
          <Box sx={{textAlign:'center',cursor:'pointer',mt:4}}onClick={() => navigate('/signup')}>Don't have an account? Create one</Box>

        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default SignIn;
