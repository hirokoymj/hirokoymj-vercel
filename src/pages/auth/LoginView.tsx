import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

import { FormInputText } from '../../components/Forms/FormInputText';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../contexts/authContext';
import { loginFormSchema } from '../validation/formValidations';
import { GoogleSignInBtn } from '../auth/GoogleSignInBtn';

const useStyles = makeStyles()((theme: Theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
  submit: {
    marginBottom: theme.spacing(4),
  },
  link: {
    paddingLeft: theme.spacing(1),
  },
}));

export const LoginView = () => {
  const { classes } = useStyles();
  const [error, setError] = useState<string>('');
  const methods = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    await doSignInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setError(`${error.code} - There is no user exist with that email`);
        } else {
          setError(`${error.code} `);
        }
      });
  };

  const onGoogleSignIn = () => {
    doSignInWithGoogle().catch((err) => {
      setError(err.code);
    });
  };

  return (
    <Container maxWidth="xs" component={Paper} className={classes.paper}>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>{' '}
      <Box component="p" className={classes.error}>
        {error}
      </Box>
      <FormProvider {...methods}>
        <FormInputText label="Email" name="email" style={{ marginBottom: '16px' }} />
        <FormInputText label="Password" name="password" type="password" style={{ marginBottom: '16px' }} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? 'submitting' : 'submit'}
        </Button>
      </FormProvider>
      <Typography align="center">
        Don't have an account?
        <Link to={'/signup'} className={classes.link}>
          Sign up
        </Link>
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        m={0}
        paddingBottom={2}
        paddingTop={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Divider style={{ width: '45%' }} />
        or
        <Divider style={{ width: '45%' }} />
      </Box>
      <GoogleSignInBtn onClick={onGoogleSignIn} />
    </Container>
  );
};
