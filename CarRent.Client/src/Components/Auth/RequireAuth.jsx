import { useAuth } from '../../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { LoaderBarsSpinner } from '../LoaderBarsSpinner';

export default function RequireAuth({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderBarsSpinner/>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
