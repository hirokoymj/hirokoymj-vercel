import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from './styles/ThemeProvider';
import App from './App';
import { AuthProvider } from './contexts/authContext';
import { SnackbarProvider } from 'notistack';

const client = new ApolloClient({
  uri: 'https://hiroko-web-backend-new-08d39ee2590b.herokuapp.com/',
  cache: new InMemoryCache(),
});
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
