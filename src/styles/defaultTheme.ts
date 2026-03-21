import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  palette: {
    primary: {
      light: '#e7f7fe',
      main: '#2196f3',
      dark: '#1769aa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#6fb2ee',
      main: '#4b9fea',
      dark: '#346fa3',
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
