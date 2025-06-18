// src/helpers/PrivateRoute.tsx
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

const PrivateRoute = ({ 
  children, 
  redirectPath = "/login",
}: PrivateRouteProps): JSX.Element => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;