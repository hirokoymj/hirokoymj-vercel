import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from 'tss-react/mui';

import { RouterButton } from '../../components/Buttons/RouterButton';

const useStyles = makeStyles()((theme) => ({
  button: {
    color: '#fff',
    border: '1px solid #fff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    fontWeight: 600,
  },
  divider: {
    color: '#fff',
    mx: 1,
  },
}));

export const LoginButton = () => {
  const { classes } = useStyles();
  const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Logout
          </Button>
          <Box component="span" m={1}>
            {user?.email ?? ''}
          </Box>
        </>
      ) : (
        <>
          <RouterButton to="/signup" text="Sign up" />
          <Box component="span" sx={{ color: '#fff', mx: 1 }}>
            |
          </Box>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => loginWithRedirect({ appState: { returnTo: '/dashboard' } })}
          >
            Login with Auth0
          </Button>
        </>
      )}
    </>
  );
};
