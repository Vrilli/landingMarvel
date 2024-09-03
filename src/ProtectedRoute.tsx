import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const isAuthenticated = true;

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
