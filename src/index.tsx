import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from './styles/ThemeProvider';
import App from './App';
import { Auth0ProviderWithNavigate } from './auth0/Auth0ProviderWithNavigate';
import { SnackbarProvider } from 'notistack';

const client = new ApolloClient({
  uri: 'https://hirokoymj-backend-vercel.vercel.app/graphql',
  cache: new InMemoryCache(),
});
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <Auth0ProviderWithNavigate>
            <ThemeProvider>
              <SnackbarProvider>
                <App />
              </SnackbarProvider>
            </ThemeProvider>
          </Auth0ProviderWithNavigate>
        </ReduxProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
