import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query('CurrentWeatherByCity', () => {
    return HttpResponse.json({
      data: {
        currentWeatherByCity: {
          __typename: 'CurrentWeather',
          id: 1,
          cityInfo: {
            __typename: 'CityInfo',
            name: 'Dallas',
            country: 'US',
            lat: '32.7767',
            lon: '-96.7970',
          },
          weather: {
            __typename: 'Weather',
            dt: 1716000000,
            condition: 'Clear',
            description: 'clear sky',
            feelsLike: '95',
            icon: '01d',
            temperature: {
              __typename: 'Temperature',
              day: 98,
              min: 85,
              max: 100,
            },
            humidity: 45,
          },
        },
      },
    });
  }),
];
