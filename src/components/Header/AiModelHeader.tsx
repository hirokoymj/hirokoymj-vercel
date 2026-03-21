import { Box, Typography, Divider, Stack, Link } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import React from 'react';

const useStyles = makeStyles()((theme: Theme) => ({
  main: {
    background: theme.palette.primary.light,
  },
  link: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
}));
interface ReferenceItem {
  label: string;
  url: string;
}

interface AiModelHeaderProps {
  title: string;
  provider: string;
  model: string;
  repoUrl: string;
  referenceUrl?: string;
  referenceLabel?: string;
  referenceArray?: ReferenceItem[];
  stack?: string[];
}

export const AiModelHeader = ({ headerInfo }: { headerInfo: AiModelHeaderProps }) => {
  const { classes } = useStyles();
  const { title, provider, model, repoUrl, referenceUrl, referenceLabel, referenceArray, stack } = headerInfo;

  const mergedReferences =
    referenceArray && referenceArray.length > 0
      ? referenceArray
      : referenceUrl && referenceLabel
        ? [{ label: referenceLabel, url: referenceUrl }]
        : [];

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
          justifyContent="center"
          sx={{
            typography: 'body1',
            color: 'text.primary',
            '& b': { fontWeight: 600 },
          }}
        >
          <Typography component="span">
            AI Provider: <b>{provider}</b>
          </Typography>
          <Typography component="span">|</Typography>
          <Typography component="span">
            Model: <b>{model}</b>
          </Typography>
          <Typography component="span">|</Typography>
          <Typography component="span">
            Code:{' '}
            <Link href={repoUrl} target="_blank" rel="noopener noreferrer" underline="hover" className={classes.link}>
              files
            </Link>
          </Typography>
          <Typography component="span">|</Typography>

          {mergedReferences.length > 0 && (
            <Typography component="span">
              Docs:{' '}
              {mergedReferences.map((ref, index) => (
                <React.Fragment key={index}>
                  <Link
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    className={classes.link}
                  >
                    {ref.label}
                  </Link>
                  {index < mergedReferences.length - 1 && ', '}
                </React.Fragment>
              ))}
            </Typography>
          )}
          <Typography component="span">|</Typography>
          {stack && (
            <Typography component="span">
              Tech Stack: <b>{stack.join(', ')}</b>
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
