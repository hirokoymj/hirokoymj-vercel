import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import { makeStyles } from 'tss-react/mui';
import { useAppDispatch, useAppSelector } from '../redux/hooks'; //Absolute path did not work in redux, so it is used a relative path.
import { setActiveTab } from '../redux/techTab/techTabSlice';

enum TabNames {
  React = 'React.js',
  JavaScript = 'JavaScript',
  express = 'express',
  GraphQL = 'GraphQL',
  Git = 'Git Commands',
  HTMLCSS = 'HTML/CSS',
  ts = 'TypeScript',
  Miscellaneous = 'Miscellaneous',
  AI = 'AI',
}

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

export const TechLayout = () => {
  const { classes } = useStyles();
  const tab = useAppSelector((state) => state.tab.value);
  const dispatch = useAppDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault;
    dispatch(dispatch(setActiveTab(newValue)));
  };

  return (
    <Paper className={classes.root}>
      <Tabs value={tab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
        <Tab label={TabNames.React} component={Link} to="react" value={0} />
        <Tab label={TabNames.AI} component={Link} to="ai" value={1} />
        <Tab label={TabNames.GraphQL} component={Link} to="graphQL" value={2} />
        <Tab label={TabNames.JavaScript} component={Link} to="js" value={3} />
        <Tab label={TabNames.ts} component={Link} to="ts" value={4} />
        <Tab label={TabNames.Git} component={Link} to="git" value={5} />
        {/* <Tab label={TabNames.express} component={Link} to="express" value={5} /> */}
      </Tabs>
      <Outlet />
    </Paper>
  );
};
