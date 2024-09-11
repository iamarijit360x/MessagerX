import { useState,useEffect} from 'react';
import { TextField, Button, Container, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../Actions/authActions';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import logo from '../../assets/logo.png'
 const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('Ready');
  const [error, setError] = useState(null);
  const [success,setSuccess]=useState(false)
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  useEffect(()=>{
    if(success)
      setTimeout(()=>{
         navigate('/signin')
    },2000)
  },[success])
  useEffect(() => {
    let index = 0;
    const messages = [
      "Warming up the magic wand...",
      "Summoning the digital pixies...",
      "Polishing the stardust...",
      "Loading the enchanted scroll...",
      "Crafting your digital potion...",
      "Enchanting the unicorns...",
      "Spinning the web of awesomeness...",
      "Summoning the tech fairies...",
      "Fueling the rocket to adventure...",
      "Brewing the elixir of greatness...",
      "Aligning the cosmic stars...",
      "Unlocking the gateway to magic...",
      "Transforming pixels into possibilities...",
      "A sprinkle of digital stardust...",
      "Your adventure begins shortly..."
    ];
    

    if (loading) {
      const intervalId = setInterval(() => {
        setText(messages[index]);
        index = (index + 1) % messages.length;
      }, 1500);

      return () => clearInterval(intervalId);
    }
  }, [loading]);
  const theme=useTheme()
  const navigate=useNavigate()

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

  const handleSubmit = async(event) => {
    event.preventDefault();
    setError(null)
    setLoading(true);
    const result = await signup(email, password);
    setLoading(false);
    if(result.status!==200)
      setError(result.message)
    else
      setSuccess('true')
    
  

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
        maxHeight:'80%',
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
          Sign Up
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
            error={emailError}
            helperText={emailError ? "Enter Valid Email" : ""}
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
            error={passwordError}
            helperText={passwordError ? "Password must be at least 8 characters" : ""}
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
            disabled={loading ||emailError||passwordError}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt:3, mb: 0,
             }}
          >
           Continue
          </Button>  
          {loading &&(
            <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
              <LinearProgress />
              <Typography variant="h6" sx={{ mt: 1 }} color='slategrey'>
                {text}
              </Typography>
            </Box>
          )}
       
          {error && <Alert sx={{mt:2}}  severity="error">{error}</Alert>}
          {success &&<Alert sx={{mt:2}} severity="success">Account Created Successfully</Alert>}
          {!loading  && <Box sx={{textAlign:'center',cursor:'pointer',mt:4}}onClick={() => navigate('/signin')}>Already have an account? Sign in</Box>}

        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default Signup;
