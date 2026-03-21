import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

export const DailyForecastSkeleton = () => {
  return (
    <>
      <Skeleton component="h2" width="100%" />
      <Skeleton variant="rectangular" width="100%" height="400px" />
    </>
  );
};

export const CurrentWeatherSkeleton = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Skeleton variant="rectangular" width="100%" height="200px" />
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <Skeleton variant="rectangular" width="100%" height="200px" />
      </Grid>
    </Grid>
  );
};
