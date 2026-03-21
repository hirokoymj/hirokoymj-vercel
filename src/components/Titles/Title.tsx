import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles'; // Import useTheme

interface TitleProps {
  text: string;
}
export const Title = ({ text }: TitleProps) => {
  const theme = useTheme();

  return (
    <Typography
      component="h2"
      variant="h5"
      color="black"
      sx={{
        marginBottom: theme.spacing(1),
      }}
      noWrap
    >
      {text}
    </Typography>
  );
};
