import { Paper } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  outputImg: { objectFit: 'cover', width: '100%', height: '100%' },
}));

export const ImgOutput = ({ outputImage }) => {
  const { classes } = useStyles();
  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      {outputImage ? <img src={outputImage} alt="Generated" className={classes.outputImg} /> : <ImageOutlinedIcon />}
    </Paper>
  );
};
