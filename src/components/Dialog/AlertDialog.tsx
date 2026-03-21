import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles()((theme: Theme) => ({
  titleRoot: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    padding: '6px',
  },
  actionButton: {
    width: '25%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  actionsRoot: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    padding: theme.spacing(2, 3),
    justifyContent: 'center',
  },
  contentRoot: {
    minHeight: '100px',
    padding: theme.spacing(3),
  },
  contentTextRoot: {
    color: theme.palette.common.black,
  },
}));

interface AlertDialogProps {
  open: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
  action: () => void;
  actionLabel: string;
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
  cancelLabel: string;
  cancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  title,
  content,
  action,
  actionLabel,
  onClose,
  cancelLabel,
}) => {
  const { classes } = useStyles();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle classes={{ root: classes.titleRoot }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent classes={{ root: classes.contentRoot }}>
        <DialogContentText classes={{ root: classes.contentTextRoot }}>{content}</DialogContentText>
      </DialogContent>
      <DialogActions classes={{ root: classes.actionsRoot }}>
        <Button color="primary" variant="outlined" className={classes.actionButton} onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={action} className={classes.actionButton}>
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
