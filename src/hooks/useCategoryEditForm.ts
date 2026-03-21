import { useQuery, useMutation } from '@apollo/client';
import get from 'lodash/get';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

import { UPDATE_CATEGORY } from '../mutations/Category';
import { CATEGORY_BY_ID } from '../queries/Category';
import { CATEGORY_ALL } from '../queries/Category';
import { CategoryFormValues } from '../pages/type/types';

export const useCategoryEditForm = (categoryId = '') => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(CATEGORY_BY_ID, {
    variables: {
      id: categoryId,
    },
  });
  const [updateCategory, { error: update_category_error }] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [CATEGORY_ALL],
  });

  const initialValues = !loading && {
    name: get(data, 'categoryById.name', ''),
    abbr: get(data, 'categoryById.abbr', ''),
  };

  const onSubmit: SubmitHandler<CategoryFormValues> = async (values) => {
    try {
      const { name, abbr } = values;
      await updateCategory({
        variables: {
          id: categoryId,
          input: {
            name,
            abbr,
          },
        },
        onCompleted: (data) => {
          const name = data?.updateCategory?.name || '';
          enqueueSnackbar(`The category "${name}" has been updated.`, {
            variant: 'success',
          });
          navigate('/category');
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    onSubmit,
    initialValues,
    loading,
    error: error || update_category_error,
  };
};
