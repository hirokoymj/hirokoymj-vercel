import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

import { FormInputText } from '../../components/Forms/FormInputText';
import { doCreateUserWithEmailAndPassword } from '../../contexts/authContext';
import { registerFormSchema } from '../validation/formValidations';

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
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

interface RegisterFormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const SignupView = () => {
  const { classes } = useStyles();
  const [error, setError] = useState<string>('');
  const methods = useForm<RegisterFormValues>({
    resolver: yupResolver(registerFormSchema),
    defaultValues: { email: '', password: '', passwordConfirmation: '' },
  });
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    await doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  return (
    <Container maxWidth="xs" component={Paper} className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>{' '}
      <Box component="p" className={classes.error}>
        {error}
      </Box>
      <FormProvider {...methods}>
        <FormInputText label="Email" name="email" style={{ marginBottom: '16px' }} />
        <FormInputText label="Password" name="password" type="password" style={{ marginBottom: '16px' }} />
        <FormInputText
          label="Confirm Password"
          name="passwordConfirmation"
          type="password"
          style={{ marginBottom: '16px' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </FormProvider>
      <Divider className={classes.divider} />
      <Typography align="center">
        Already have an account? <Link to={'/login'}>Login</Link>
      </Typography>
    </Container>
  );
};
