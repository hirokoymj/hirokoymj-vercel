import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  main: {
    background: theme.palette.primary.light,
  },
  link: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
}));

interface TechStackHeaderProps {
  title: string;
  gitHub: string;
  stack: string[];
}

export const TechStackHeader = ({ headerInfo }: { headerInfo: TechStackHeaderProps }) => {
  const { classes } = useStyles();
  const { title, gitHub, stack } = headerInfo;

  return (
    <Box className={classes.main} sx={{ backgroundColor: '#e8f6ff' }}>
      <Box sx={{ p: 2, pt: 1.5, pb: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ p: 2, pt: 0 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          sx={{ typography: 'body1', color: 'text.primary', '& b': { fontWeight: 600 } }}
        >
          <Typography component="span">
            Code:{' '}
            <Link href={gitHub} target="_blank" rel="noopener noreferrer" underline="hover" className={classes.link}>
              GitHub
            </Link>
          </Typography>
          <Typography component="span">|</Typography>
          <Typography component="span">
            Tech Stack: <b>{stack.join(', ')}</b>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
