import { FC, ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  iconButtonRoot: {
    backgroundColor: theme.palette.secondary.dark,
    padding: theme.spacing(1),
    margin: theme.spacing(0, 1),
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  svgIconRoot: {
    color: theme.palette.common.white,
    fontSize: '1.3rem',
    textAlign: 'center',
    fontWeight: 400,
  },
}));

interface ActionButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const ActionButton: FC<ActionButtonProps> = ({ children, onClick }) => {
  const { classes } = useStyles();

  return (
    <IconButton classes={{ root: classes.iconButtonRoot }} onClick={onClick}>
      {children}
    </IconButton>
  );
};
