import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Chat from './Pages/Chat';
import SignIn from './Pages/SignIn';
import Navbar from './Components/Navbar';
import { AuthProvider } from './Middleware/AuthContex';
import { NotProtectedRoute, ProtectedRoute } from './Middleware/routeProtect';
import WelcomePage from './Pages/WelcomeScreen';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode palette
                primary: {
                  main: '#1976d2',
                },
                secondary: {
                  main: '#dc004e',
                },
                customColor: {
                  main: 'rgb(3,32,32)', // Example of a custom color
                },
              }
            : {
                // Dark mode palette
                primary: {
                  main: '#90caf9',
                },
                secondary: {
                  main: '#f48fb1',
                },
                customColor: {
                  main: '#ff9800', // Example of a custom color for dark mode
                },
              }),
        },
      }),
    [mode],
  );

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
           <BrowserRouter>
           <AuthProvider>
           <Navbar/>
            <Routes>
              <Route path='/' element={<WelcomePage/>}/>
              <Route element={<NotProtectedRoute/>}>
                <Route path='/login' element={<SignIn />} />
              </Route>
              <Route element={<ProtectedRoute/>}>
               
                <Route path='/dashboard' element={<Chat />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
