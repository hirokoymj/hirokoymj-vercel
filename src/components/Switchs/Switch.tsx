import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
//import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'; //must use relative path
//import { setThemeName } from 'redux/theme/themeSlice';
import { setThemeName } from '../../redux/theme/themeSlice';

enum PageTheme {
  Default = 'default',
  Seasonal = 'seasonal',
}

const useStyles = makeStyles()((theme: Theme) => ({
  switch: {
    paddingLeft: theme.spacing(4),
    flex: 1,
  },
}));

export const ThemeSwitch = () => {
  const { classes } = useStyles();
  const themeName = useAppSelector((state) => state.theme.name);
  const dispatch = useAppDispatch();

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const themeName = event.target.checked ? PageTheme.Seasonal : PageTheme.Default;
    dispatch(setThemeName(themeName));
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={themeName === PageTheme.Seasonal}
          onChange={handleSwitchChange}
          name="themeSwitch"
          size="medium"
          color="secondary"
        />
      }
      label="Theme"
      className={classes.switch}
    />
  );
};
