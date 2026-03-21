import React, { PropsWithChildren } from 'react';
import { ApolloError } from '@apollo/client';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface QueryResultProps {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: unknown;
}

export const QueryResult: React.FC<PropsWithChildren<QueryResultProps>> = ({
  loading,
  error,
  data,
  children,
}): React.ReactElement<any, any> | null => {
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
