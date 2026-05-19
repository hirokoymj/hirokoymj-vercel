import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from '../../styles/defaultTheme';
import { CurrentWeatherInfo } from './CurrentWeatherInfo';
import { Units } from '../../__generated__/graphql';

vi.mock('../../components/GoogleMap/GoogleMap', () => ({
  GoogleMap: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="google-map">{children}</div>
  ),
}));

const createClient = () =>
  new ApolloClient({
    link: new HttpLink({ uri: 'https://hirokoymj-backend-vercel.vercel.app/graphql' }),
    cache: new InMemoryCache(),
    devtools: { enabled: false },
  });

const renderComponent = () =>
  render(
    <ApolloProvider client={createClient()}>
      <ThemeProvider theme={defaultTheme}>
        <CurrentWeatherInfo city="dallas" unit={Units.Imperial} />
      </ThemeProvider>
    </ApolloProvider>
  );

describe('CurrentWeatherInfo', () => {
  it('shows a loading skeleton while fetching data', () => {
    renderComponent();
    expect(screen.queryByText('Dallas, US')).not.toBeInTheDocument();
  });

  it('displays city name and country after data loads', async () => {
    renderComponent();
    expect(await screen.findByText('Dallas, US')).toBeInTheDocument();
  });

  it('displays temperature in Fahrenheit after data loads', async () => {
    renderComponent();
    expect(await screen.findByText(/98°F/)).toBeInTheDocument();
  });

  it('displays humidity percentage after data loads', async () => {
    renderComponent();
    expect(await screen.findByText('Humidity: 45%')).toBeInTheDocument();
  });

  it('renders the Google Map after data loads', async () => {
    renderComponent();
    await screen.findByText('Dallas, US');
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });
});
