import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppSelector } from '../redux/hooks'; //Redux cannot import using absolute path.
import { defaultTheme } from './defaultTheme';
import { winterTheme } from './winterTheme';

enum Theme {
  default = 'default',
  seasonal = 'seasonal',
}

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeName = useAppSelector((state) => state.theme.name);

  return (
    <MuiThemeProvider theme={themeName === Theme.default ? defaultTheme : winterTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
