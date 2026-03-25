import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  footer: {
    padding: theme.spacing(2),
    bottom: 0,
    width: '100%',
    color: '#939AA8',
    textAlign: 'center',
    marginTop: theme.spacing(3),
  },
  icon: {
    color: '#939AA8',
    '&:hover': {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

interface IconButtonLinkProps {
  icon: React.ReactNode;
  to: string;
}

const IconButtonLink = ({ icon, to }: IconButtonLinkProps) => {
  const { classes } = useStyles();

  return (
    <Link href={to} color="inherit" target="_blank" rel="noreferrer">
      <IconButton className={classes.icon}>{icon}</IconButton>
    </Link>
  );
};

export const PageFooter = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} hirokoymj.com All rights reserved.
      </Typography>
      <IconButtonLink icon={<GitHubIcon fontSize="large" />} to="https://github.com/hirokoymj/hirokoymj-vercel" />
    </footer>
  );
};
