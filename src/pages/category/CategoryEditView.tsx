import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { SimpleDrawer } from '../../components/Dialog/SimpleDrawer';
import { CategoryEditForm } from '../category/CategoryEditForm';
import { useCategoryEditForm } from '../../hooks/useCategoryEditForm';
import { CategoryParams } from '../type/types';

export const CategoryEditView = () => {
  const { categoryId } = useParams<CategoryParams>();
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const { onSubmit, initialValues, loading, error } = useCategoryEditForm(categoryId);

  const onClose = () => {
    setOpen(false);
    navigate('/category');
  };

  if (error) <p>Page error</p>;

  return (
    <div>
      {loading ? (
        <p>...loading</p>
      ) : (
        <SimpleDrawer open={open} title="Edit Category" onClose={onClose}>
          <CategoryEditForm onSubmit={onSubmit} initialValues={initialValues} loading={loading} />
        </SimpleDrawer>
      )}
    </div>
  );
};
