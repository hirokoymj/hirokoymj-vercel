import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

import { PageHeader } from '../pages/base/PageHeader';
import { PageFooter } from '../pages/base/PageFooter';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    paddingTop: '48px', // match your AppBar height
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const RootLayout = () => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <PageHeader open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Outlet />
          </Grid>
          <Grid size={12}>
            <PageFooter />
          </Grid>
        </Container>
      </main>
    </div>
  );
};
