import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import resumePdf from '../../assets/resume.pdf';

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
      <Typography variant="body2">
        <Link href={resumePdf} target="_blank" rel="noopener noreferrer">
          Resume
        </Link>
      </Typography>
    </footer>
  );
};
