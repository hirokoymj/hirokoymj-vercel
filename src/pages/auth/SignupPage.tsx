import { useState, FormEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  error: {
    color: 'red',
  },
}));

const SignupPage = () => {
  const { classes } = useStyles();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const res = await fetch(
      `https://${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnections/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
          email,
          password,
          connection: 'Username-Password-Authentication',
        }),
      },
    );

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.description || data.message || 'Signup failed');
      return;
    }

    loginWithRedirect({
      authorizationParams: { login_hint: email },
      appState: { returnTo: '/dashboard' },
    });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5" gutterBottom>
          Sign Up
        </Typography>
        {error && (
          <Box component="p" className={classes.error}>
            {error}
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            className={classes.field}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            className={classes.field}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
            disabled={submitting}
          >
            {submitting ? 'Creating account...' : 'Create Account'}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            className={classes.button}
            onClick={() => navigate('/')}
          >
            Back
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
