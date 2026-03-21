import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Container } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { subCategoryFormSchema } from '../validation/formValidations';
import { useSubCategoryForm } from '../../hooks/useSubCategoryForm';
import { FormInputText } from '../../components/Forms/FormInputText';
import { FormInputDropdown } from '../../components/Forms/FormInputDropdown';
import { SubCategoryFormValues } from '../type/types';

export const SubCategoryForm = () => {
  const { onSubmit, category_options, loading } = useSubCategoryForm();
  const methods = useForm<SubCategoryFormValues>({
    resolver: yupResolver(subCategoryFormSchema),
    defaultValues: {
      categoryId: '',
      name: '',
      order: '',
    },
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
    <Container maxWidth="xs" style={{ padding: '24px' }}>
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <FormInputDropdown
              name="categoryId"
              label="Category"
              options={category_options}
              disabled={loading}
              focused={true}
            />
          </Grid>
          <Grid size={12}>
            <FormInputText label="Sub Category Name" name="name" />
          </Grid>
          <Grid size={12}>
            <FormInputText label="Order" name="order" type="number" />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
};
