import { PropsWithChildren } from 'react';
import { ApolloError } from '@apollo/client';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface QueryResultProps {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: unknown;
}

export const QueryResult = ({
  loading,
  error,
  data,
  children,
}: PropsWithChildren<QueryResultProps>) => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return (
      <Box
        component="section"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}
      >
        <CircularProgress color="primary" size={80} />
      </Box>
    );
  }
  if (data) {
    return <>{children}</>;
  }

  return <p>Nothing to show...</p>;
};
