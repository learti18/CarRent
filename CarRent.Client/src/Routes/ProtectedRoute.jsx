import React, { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { STATUS } from "../Utils/AuthStatus";
import { LoaderBarsSpinner } from "./../Components/LoaderBarsSpinner";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
}
