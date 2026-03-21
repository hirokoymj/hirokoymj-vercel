import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
//import Icon from '@mui/material/Icon';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  iconButtonRoot: {
    backgroundColor: theme.palette.secondary.dark,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  svgIconRoot: {
    color: theme.palette.common.white,
    fontSize: '1.3rem',
    textAlign: 'center',
    fontWeight: 400,
  },
}));

interface ActionRouterButtonProps {
  to: string;
  children: React.ReactNode;
}

export const ActionRouterButton: React.FC<ActionRouterButtonProps> = ({ to, children }) => {
  const { classes } = useStyles();

  return (
    <NavLink to={to}>
      <IconButton classes={{ root: classes.iconButtonRoot }}>{children}</IconButton>
    </NavLink>
  );
};
