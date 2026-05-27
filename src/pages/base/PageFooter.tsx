import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  footer: {
    padding: theme.spacing(2),
    bottom: 0,
    width: '100%',
    color: '#939AA8',
    textAlign: 'center',
    marginTop: theme.spacing(3),
  },
}));

export const PageFooter = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} hirokoymj.com All rights reserved.
      </Typography>
    </footer>
  );
};
