import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { enqueueSnackbar } from 'notistack';

import { SubCategoryTable } from '../pages/subCategory/SubCategoryTable';
import { AlertDialog } from '../components/Dialog/AlertDialog';
import { DELETE_SUB_CATEGORY } from '../mutations/SubCategory';
import { SUB_CATEGORY_ALL } from '../queries/SubCategory';
import { SubCategoryForm } from '../pages/subCategory/SubCategoryForm';
import { Title } from '../components/Titles/Title';

export const SubCategoryLayout = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [subCategoryId, setSubCategoryId] = useState<string>('');
  const [deleteSubCategory] = useMutation(DELETE_SUB_CATEGORY, {
    refetchQueries: [SUB_CATEGORY_ALL],
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id: string) => {
    setSubCategoryId(id);
    setOpen(true);
  };

  const handleDeleteSubCategory = async () => {
    try {
      await deleteSubCategory({
        variables: {
          id: subCategoryId,
        },
        onCompleted: (data) => {
          const name = data?.deleteSubCategory?.name || '';
          enqueueSnackbar(`Deleted the sub category - ${name}.`, {
            variant: 'success',
          });
          handleClose();
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="lg">
      <Outlet />
      <Grid container spacing={3} justifyContent="center">
        <Grid size={12}>
          <Title text="Tech Link Subcategory" />
          <Paper>{<SubCategoryForm />}</Paper>
        </Grid>
        <Grid size={12}>
          <Paper>
            <Container maxWidth="lg">
              <SubCategoryTable openDialog={handleOpen} />
            </Container>
          </Paper>
        </Grid>
      </Grid>
      <AlertDialog
        open={open}
        onClose={handleClose}
        title="Delete Sub Category"
        content={
          <>
            <Typography component="p" variant="body1">
              Are you sure to delete the sub category?
            </Typography>
          </>
        }
        actionLabel="Delete"
        action={handleDeleteSubCategory}
        cancelLabel="Cancel"
        cancel={handleClose}
      />
    </Container>
  );
};
