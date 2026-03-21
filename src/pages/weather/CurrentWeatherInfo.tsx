import { useQuery } from '@apollo/client';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';
import RoomIcon from '@mui/icons-material/Room';

import { CURRENT_WEATHER_BY_CITY } from '../../queries/Weather';
import { GoogleMap } from '../../components/GoogleMap/GoogleMap';
import { CurrentWeatherSkeleton } from '../../components/Skeleton/WeatherSkeleton';
import { Units } from '../../__generated__/graphql';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    boxShadow: 'none',
    padding: '32px !important',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: '16px !important',
    },
  },
  weatherIcon: {
    marginRight: theme.spacing(1),
  },
  cityCountry: {
    fontWeight: 500,
    marginBottom: theme.spacing(2),
  },
  weatherInfo: {
    height: 'auto',
    padding: theme.spacing(3),
    textAlign: 'center',
  },
}));

interface CurrentWeatherInfoProps {
  city: string;
  unit: Units;
}

export const CurrentWeatherInfo = ({ city, unit = Units.Imperial }: CurrentWeatherInfoProps) => {
  const { classes } = useStyles();
  const { data, loading, error } = useQuery(CURRENT_WEATHER_BY_CITY, {
    variables: {
      city,
      unit,
    },
  });

  //if (error) return <p>Error</p>;

  const cityInfo = !loading && data?.currentWeatherByCity?.cityInfo ? data.currentWeatherByCity.cityInfo : {};
  const weather = !loading && data?.currentWeatherByCity?.weather ? data.currentWeatherByCity.weather : {};
  const { lat, lon, name, country } = cityInfo as any;
  const { temperature, description, humidity, icon, feelsLike } = weather as any;
  const unit_format = unit === Units.Imperial ? 'F' : 'C';

  return (
    <>
      {loading ? (
        <CurrentWeatherSkeleton />
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper className={classes.weatherInfo}>
              <Grid container>
                <Grid size={12}>
                  <Typography variant="h4" gutterBottom className={classes.cityCountry}>
                    {name}, {country}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <div
                    style={{
                      display: 'flex',
                      marginBottom: '16px',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                      width="50"
                      height="50"
                      alt=""
                      className={classes.weatherIcon}
                    />
                    <Typography variant="h4">
                      {temperature.day | 0}&deg;{unit_format}
                    </Typography>
                  </div>
                </Grid>
                <Grid size={12}>
                  <Typography variant="body1">
                    Feels like {feelsLike}&deg;{unit_format}. {description}
                  </Typography>
                  <Typography variant="body1">{`Humidity: ${humidity}%`}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <div
              style={{
                height: '100%',
                width: '100%',
              }}
            >
              <GoogleMap lat={parseFloat(lat)} lng={parseFloat(lon)}>
                <RoomIcon color="error" fontSize="large" />
              </GoogleMap>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};
