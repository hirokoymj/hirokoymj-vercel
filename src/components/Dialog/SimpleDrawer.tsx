import { FC, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close'; // Icon import path change
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  paper: {
    top: 0,
    height: 'calc(100% - 20px)',
    maxHeight: 'calc(100% - 20px)',
    right: 0,
    width: '400px',
    overflowY: 'hidden',
    position: 'fixed',
    margin: '9px',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      width: 'auto',
    },
  },
  titleRoot: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  actionButton: {
    width: '50%',
    backgroundColor: theme.palette.primary.dark,
  },
  cancelBtn: {
    width: '50%',
  },
  actionsRoot: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    padding: theme.spacing(2, 3),
  },
}));

interface SimpleDrawerProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const SimpleDrawer: FC<SimpleDrawerProps> = ({ open, title, onClose, children }) => {
  const { classes } = useStyles();

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <DialogTitle classes={{ root: classes.titleRoot }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ overflowY: 'visible' }}>{children}</DialogContent>
    </Dialog>
  );
};
