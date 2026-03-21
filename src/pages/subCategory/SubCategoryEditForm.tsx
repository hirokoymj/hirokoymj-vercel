import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { subCategoryFormSchema } from '../validation/formValidations';
import { FormInputText } from '../../components/Forms/FormInputText';
import { FormInputDropdown } from '../../components/Forms/FormInputDropdown';
import { SubCategoryFormValues, DropdownOption } from '../type/types';

interface SubCategoryEditFormProps {
  onSubmit: (values: SubCategoryFormValues) => void;
  category_options: DropdownOption[];
  initialValues: any; //FIX LATER
  loading: boolean;
}

export const SubCategoryEditForm = ({
  onSubmit,
  category_options,
  initialValues,
  loading,
}: SubCategoryEditFormProps) => {
  const methods = useForm<SubCategoryFormValues>({
    resolver: yupResolver(subCategoryFormSchema),
    defaultValues: initialValues,
  });
  const { handleSubmit } = methods;

  return (
    <Grid container direction="column" spacing={3}>
      {loading ? (
        <p>...Loading</p>
      ) : (
        <FormProvider {...methods}>
          <Grid size={12}>
            <FormInputDropdown name="categoryId" label="Category" options={category_options} focused={true} />
          </Grid>
          <Grid size={12}>
            <FormInputText label="Sub Category Name" name="name" />
          </Grid>
          <Grid size={12}>
            <FormInputText label="Order" name="order" type="number" />
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
