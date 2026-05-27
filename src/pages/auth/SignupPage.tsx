import { useState, FormEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { signUpFormSchema } from '../validation/formValidations';

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

type FieldErrors = { email: string; password: string };

const SignupPage = () => {
  const { classes } = useStyles();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const validateField = async (field: keyof FieldErrors, value: string) => {
    try {
      await signUpFormSchema.validateAt(field, { email, password, [field]: value });
      setFieldErrors((prev) => ({ ...prev, [field]: '' }));
    } catch (err) {
      if (err instanceof ValidationError) {
        setFieldErrors((prev) => ({ ...prev, [field]: err.message }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    try {
      await signUpFormSchema.validate({ email, password }, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: FieldErrors = { email: '', password: '' };
        err.inner.forEach((e) => {
          if (e.path === 'email') errors.email = e.message;
          if (e.path === 'password') errors.password = e.message;
        });
        setFieldErrors(errors);
        return;
      }
    }

    setSubmitting(true);
    const res = await fetch(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnections/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        email,
        password,
        connection: 'Username-Password-Authentication',
      }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      if (data.code === 'invalid_signup') {
        setApiError('An account with this email already exists.');
      } else {
        setApiError(data.description || data.message || 'Signup failed');
      }
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
        {apiError && (
          <Box component="p" className={classes.error}>
            {apiError}
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateField('email', email)}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            fullWidth
            className={classes.field}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validateField('password', password)}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            fullWidth
            className={classes.field}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
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
          <Button variant="outlined" fullWidth className={classes.button} onClick={() => navigate('/')}>
            Back
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
