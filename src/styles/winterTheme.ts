import { createTheme } from '@mui/material/styles';

export const winterTheme = createTheme({
  palette: {
    primary: {
      light: '#b7deb8',
      main: '#4caf50',
      dark: '#376839ff',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f6685e',
      main: '#f44336',
      dark: '#aa2e25',
      contrastText: '#fff',
    },
    text: {
      primary: '#000',
    },
    background: {
      default: '#f2f3f3',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif', 'Titillium Web'].join(','),
  },
});
