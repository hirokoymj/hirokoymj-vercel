import React from 'react';
import { Link, LinkProps as RouterLinkProps } from 'react-router-dom';
//import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  button: {
    color: '#fff',
    border: '1px solid #fff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    fontWeight: 600,
  },
}));

interface RouterButtonProps {
  to: RouterLinkProps['to'];
  text: string;
}

export const RouterButton: React.FC<RouterButtonProps> = ({ to, text }) => {
  const { classes } = useStyles();

  return (
    <Link to={to}>
      <Button variant="outlined" className={classes.button}>
        {text}
      </Button>
    </Link>
  );
};
