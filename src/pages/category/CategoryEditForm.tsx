import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { categoryFormSchema } from '../validation/formValidations';
import { FormInputText } from '../../components/Forms/FormInputText';
import { CategoryFormValues } from '../type/types';

interface CategoryEditFormProps {
  onSubmit: (values: CategoryFormValues) => void;
  initialValues: any; //FIX LATER
  loading: boolean;
}

export const CategoryEditForm = ({ onSubmit, initialValues, loading }: CategoryEditFormProps) => {
  const methods = useForm<CategoryFormValues>({
    resolver: yupResolver(categoryFormSchema),
    defaultValues: initialValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Grid container direction="column" spacing={3}>
      {loading ? (
        <p>...Loading</p>
      ) : (
        <FormProvider {...methods}>
          <Grid size={12}>
            <FormInputText label="Name" name="name" focused={true} />
          </Grid>
          <Grid size={12}>
            <FormInputText label="Abbreviation" name="abbr" />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
              Edit
            </Button>
          </Grid>
        </FormProvider>
      )}
    </Grid>
  );
};
