import { createTheme } from '@mui/material/styles';
import { blue, purple, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[700]
    },
    secondary: {
      main: purple[400]
    },
    error: {
      main: red.A700
    }
  }
});

export const colors = {
  backgroundColor: 'rgba(150, 80, 49, 0.3)'
};
