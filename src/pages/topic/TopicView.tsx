import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Routes, Route } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { TopicTable } from '../topic/TopicTable';
import { AlertDialog } from '../../components/Dialog/AlertDialog';
import { Title } from '../../components/Titles/Title';
import { DELETE_TOPIC } from '../../mutations/Topic';
import { TOPIC_ALL } from '../../queries/Topic';
import { TopicEditView } from '../topic/TopicEditView';
import { TopicForm } from '../topic/TopicForm';

export const TopicView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [topicId, setTopicId] = useState<string>('');
  const [deleteTopic, { loading }] = useMutation(DELETE_TOPIC, {
    refetchQueries: [TOPIC_ALL],
  });

  const handleClose = () => setOpen(false);

  const handleOpen = (id: string) => {
    setTopicId(id);
    setOpen(true);
  };

  const handleDeleteTopic = async () => {
    try {
      await deleteTopic({
        variables: {
          id: topicId,
        },
      });
      enqueueSnackbar('Topic successfully deleted!', {
        variant: 'success',
      });
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path=":topicId/:categoryId" element={<TopicEditView />} />
      </Routes>
      <Grid container spacing={3} justifyContent="center">
        <Grid size={12}>
          <Title text="Tech links" />
          <Paper>
            <TopicForm />
          </Paper>
        </Grid>
        <Grid size={12}>
          <Paper>
            <Container maxWidth="lg">
              <TopicTable openDialog={handleOpen} />
            </Container>
          </Paper>
        </Grid>
        <AlertDialog
          open={open}
          onClose={handleClose}
          title="Delete Topic"
          content={
            <>
              <Typography component="p" variant="body1">
                Do you want to to delete a topic?
              </Typography>
            </>
          }
          actionLabel={loading ? 'Deleting' : 'Delete'}
          action={handleDeleteTopic}
          cancelLabel="Cancel"
          cancel={handleClose}
        />
      </Grid>
    </Container>
  );
};
