import './styles/index.css';

import { FunctionComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import { Router } from './router';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Navbar from '@/components/Navbar';

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Navbar />
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
