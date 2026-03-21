import { gql } from '../__generated__';

export const CURRENT_WEATHER_BY_CITY = gql(`
  query CurrentWeatherByCity($city: String!, $unit: Units) {
    currentWeatherByCity(city: $city, unit: $unit) {
      id
      cityInfo {
		name
		country
		lat
		lon
      }
      weather {
        dt
        condition
        description
        feelsLike
        icon
        temperature {
			day
			min
			max
        }
        humidity
      }
    }
  }
`);

export const DAILY_FORECAST = gql(`
  query DailyForecast($city: String!, $unit: Units) {
    dailyForecast(city: $city, unit: $unit) {
      id
      cityInfo {
		name
		country
		lat
		lon
      }
      forecastList {
        dt
        condition
        icon
        temperature {
			day
			min
			max
        }
        humidity
        wind
        rain
      }
    }
  }
`);
