import React, { useMemo } from "react";
import { useAuth } from "../Hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { STATUS } from "../Utils/AuthStatus";
import { LoaderBarsSpinner } from "./../Components/LoaderBarsSpinner";

export default function ProtectedRoute() {
  const { isAuthenticated, status } = useAuth();
  const location = useLocation();

  return useMemo(() => {
    // Show loading state while checking authentication
    if (status === STATUS.PENDING) {
      return <LoaderBarsSpinner fullscreen />;
    }

    // Only redirect if we're sure the user is not authenticated
    if (status === STATUS.IDLE || status === STATUS.FAILED) {
      return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    // If we're authenticated or still checking, show the content
    return <Outlet />;
  }, [isAuthenticated, status, location]);
}
