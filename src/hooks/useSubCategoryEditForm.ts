import { useQuery, useMutation } from '@apollo/client';
import get from 'lodash/get';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

import { UPDATE_SUB_CATEGORY } from '../mutations/SubCategory';
import { SUB_CATEGORY_BY_ID } from '../queries/SubCategory';
import { CATEGORIES } from '../queries/Category';
import { SubCategoryFormValues, DropdownOption } from '../pages/type/types';

export const useSubCategoryEditForm = (subCategoryId = '') => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(CATEGORIES);
  const { data: data_sub_category, loading: loading_sub_category } = useQuery(SUB_CATEGORY_BY_ID, {
    variables: {
      id: subCategoryId,
    },
  });
  const [updateSubCategory] = useMutation(UPDATE_SUB_CATEGORY);

  const initialValues = !loading_sub_category && {
    categoryId: get(data_sub_category, 'subCategoryById.category.id', ''),
    name: get(data_sub_category, 'subCategoryById.name', ''),
    order: get(data_sub_category, 'subCategoryById.order', 1),
  };

  const category_options: DropdownOption[] =
    (!loading && data?.categories?.map((d) => ({ label: d.name, value: d.id }))) || [];

  const onSubmit: SubmitHandler<SubCategoryFormValues> = async (values) => {
    try {
      const { name, categoryId, order } = values;
      await updateSubCategory({
        variables: {
          id: subCategoryId,
          input: {
            name,
            category: categoryId,
            order: parseInt(order),
          },
        },
        onCompleted: (data) => {
          const name = data?.updateSubCategory?.name || '';
          enqueueSnackbar(`The subcategory "${name}" was updated. `, {
            variant: 'success',
          });
          navigate('/subCategory');
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    onSubmit,
    category_options,
    initialValues,
    loading: loading || loading_sub_category,
  } as const;
};
