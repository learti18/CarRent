import React, { useMemo } from "react";
import { LoaderBarsSpinner } from "../Components/LoaderBarsSpinner";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { STATUS } from "../Utils/AuthStatus";

export default function GuestRoute() {
  const { isAuthenticated, status } = useAuth();
  const location = useLocation();

  return useMemo(() => {
    // Show loading state while checking authentication
    if (status === STATUS.PENDING) {
      return <LoaderBarsSpinner fullscreen />;
    }

    // Only redirect if we're sure the user is authenticated
    if (status === STATUS.SUCCESS) {
      return <Navigate to={location.state?.from?.pathname || "/"} replace />;
    }

    // If we're not authenticated or still checking, show the content
    return <Outlet />;
  }, [isAuthenticated, status, location]);
}
