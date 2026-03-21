import { useMutation } from '@apollo/client';
import { SubmitHandler } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

import { CREATE_CATEGORY } from '../mutations/Category';
import { CATEGORY_ALL } from '../queries/Category';
import { CategoryFormValues } from '../pages/type/types';

export const useCategoryForm = () => {
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [CATEGORY_ALL],
  });

  const onSubmit: SubmitHandler<CategoryFormValues> = async (values) => {
    try {
      await createCategory({
        variables: {
          input: {
            ...values,
          },
        },
        onCompleted: (data) => {
          const name = data?.createCategory?.name || '';
          enqueueSnackbar(`A new category "${name}" was created.`, {
            variant: 'success',
          });
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    onSubmit,
  };
};
