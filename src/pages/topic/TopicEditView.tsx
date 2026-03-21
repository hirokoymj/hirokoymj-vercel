import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { TopicEditForm } from '../topic/TopicEditForm';
import { SimpleDrawer } from '../../components/Dialog/SimpleDrawer';
import { useTopicEditForm } from '../../hooks/useTopicEditForm';
import { TopicAndCategoryParams } from '../type/types';

export const TopicEditView = () => {
  const { topicId, categoryId } = useParams<TopicAndCategoryParams>();
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const { loading, category_options, subCategory_options, onSubmit, defaultValues } = useTopicEditForm(
    topicId,
    categoryId,
  );

  const onClose = () => {
    setOpen(false);
    navigate('/topic');
  };

  return (
    <>
      {loading ? (
        <p>....loading</p>
      ) : (
        <SimpleDrawer open={open} title="Edit Topic" onClose={onClose}>
          <TopicEditForm
            onSubmit={onSubmit}
            category_options={category_options}
            subCategory_options={subCategory_options}
            defaultValues={defaultValues}
            loading={loading}
          />
        </SimpleDrawer>
      )}
    </>
  );
};
