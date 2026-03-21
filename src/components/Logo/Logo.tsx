import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles()((theme: Theme) => ({
  logo: {
    textDecoration: 'none !important',
  },
  boldFont: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontWeight: 700,
    fontSize: '1.5rem',
    color: theme.palette.primary.contrastText,
  },
  lightFont: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontWeight: 400,
    fontSize: '1.5rem',
    color: theme.palette.primary.contrastText,
  },
}));

export const Logo = () => {
  const { classes } = useStyles();

  return (
    <Link to={'/'} className={classes.logo}>
      <Typography variant="h6" component="h1">
        <span className={classes.boldFont}>hiroko</span>
        <span className={classes.lightFont}>ymj.com</span>
      </Typography>
    </Link>
  );
};
