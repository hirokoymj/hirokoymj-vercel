import { useQuery, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { SubmitHandler } from 'react-hook-form';

import { CREATE_SUB_CATEGORY } from '../mutations/SubCategory';
import { SUB_CATEGORY_ALL } from '../queries/SubCategory';
import { CATEGORIES } from '../queries/Category';
import { SubCategoryFormValues, DropdownOption } from '../pages/type/types';

export const useSubCategoryForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createSubCategory] = useMutation(CREATE_SUB_CATEGORY, {
    refetchQueries: [SUB_CATEGORY_ALL],
  });
  const { data, loading } = useQuery(CATEGORIES);

  const category_options: DropdownOption[] =
    (!loading && data?.categories?.map((d) => ({ label: d.name, value: d.id }))) || [];

  const onSubmit: SubmitHandler<SubCategoryFormValues> = async (values) => {
    try {
      const { name, categoryId, order } = values;
      await createSubCategory({
        variables: {
          input: {
            name,
            category: categoryId,
            order: parseInt(order),
          },
        },
        onCompleted: (data) => {
          const name = data?.createSubCategory?.name || '';
          enqueueSnackbar(`A new subcategory - ${name} has been created.`, {
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
    category_options,
    loading,
  } as const;
};
