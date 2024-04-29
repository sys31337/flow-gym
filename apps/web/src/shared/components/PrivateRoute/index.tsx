import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@shared/components/Authentication/AuthContext'; // Replace with your authentication context

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth() || {};
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
};

export default PrivateRoute;
