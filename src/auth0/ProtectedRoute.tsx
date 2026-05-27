import { useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: '/dashboard' } });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
