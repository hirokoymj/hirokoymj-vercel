import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { DailyForecast } from './DailyForcast';
import { CurrentWeatherInfo } from './CurrentWeatherInfo';
import { CityParams } from '../type/types';
import { Units } from '../../__generated__/graphql';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export const WeatherView = () => {
  const { classes } = useStyles();
  const { city = 'dallas' } = useParams<CityParams>();
  const unit = Units.Imperial;

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid size={12}>
          <CurrentWeatherInfo city={city} unit={unit} />
        </Grid>
        <Grid size={12}>
          <DailyForecast city={city} unit={unit} />
        </Grid>
      </Grid>
    </>
  );
};
