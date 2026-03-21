import { Box, Typography, Button } from '@mui/material';
import { useRef } from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#2196f3',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    textAlign: 'center',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
    height: '100px',
  },
}));

export const FileUploadZone = ({ handleUpload, fileError }) => {
  const { classes } = useStyles();
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Button className={classes.dropzone} onClick={handleClick}>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Typography variant="body2" color="textSecondary">
        Click here to upload or select an image
        <br /> (.jpg, .jpeg, .png only)
      </Typography>
      {fileError && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {fileError}
        </Typography>
      )}
    </Button>
  );
};
