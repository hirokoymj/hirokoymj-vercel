import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { topicFormSchema } from '../validation/formValidations';
import { FormInputDropdown } from '../../components/Forms/FormInputDropdown';
import { FormInputText } from '../../components/Forms/FormInputText';
import { TopicFormValues, DropdownOption } from '../type/types';

interface TopicEditFormProps {
  onSubmit: (values: TopicFormValues) => void;
  category_options: DropdownOption[];
  subCategory_options: DropdownOption[];
  defaultValues: any; //FIX LATER
  loading: boolean;
}

export const TopicEditForm = ({
  onSubmit,
  category_options,
  subCategory_options,
  defaultValues,
  loading,
}: TopicEditFormProps) => {
  const methods = useForm({
    resolver: yupResolver(topicFormSchema),
    defaultValues: defaultValues,
  });

  return (
    <Grid container direction="column" spacing={3}>
      <FormProvider {...methods}>
        <Grid size={12}>
          <FormInputDropdown
            name="category"
            label="Category"
            options={category_options}
            disabled={loading}
            focused={true}
          />
        </Grid>
        <Grid size={12}>
          <FormInputDropdown name="subCategory" label="Sub Category" disabled={loading} options={subCategory_options} />
        </Grid>
        <Grid size={12}>
          <FormInputText label="Title" name="title" />
        </Grid>
        <Grid size={12}>
          <FormInputText label="URL" name="url" />
        </Grid>
        <Grid size={12}>
          <FormInputText label="order" name="order" type="number" />
        </Grid>
        <Grid size={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth onClick={methods.handleSubmit(onSubmit)}>
            Edit
          </Button>
        </Grid>
      </FormProvider>
    </Grid>
  );
};
