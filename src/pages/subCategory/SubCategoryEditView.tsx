import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { SimpleDrawer } from '../../components/Dialog/SimpleDrawer';
import { SubCategoryEditForm } from './SubCategoryEditForm';
import { useSubCategoryEditForm } from '../../hooks/useSubCategoryEditForm';
import { SubCategoryParams } from '../type/types';

export const SubCategoryEditView = () => {
  const { subCategoryId } = useParams<SubCategoryParams>();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(true);
  const { onSubmit, initialValues, loading, category_options } = useSubCategoryEditForm(subCategoryId!);

  const onClose = () => {
    setOpen(false);
    navigate('/subCategory');
  };
  if (!loading) console.log(initialValues);

  return (
    <>
      {loading ? (
        <p>...loading</p>
      ) : (
        <SimpleDrawer open={open} title="Edit Subcategory" onClose={onClose}>
          <SubCategoryEditForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            loading={loading}
            category_options={category_options}
          />
        </SimpleDrawer>
      )}
    </>
  );
};
