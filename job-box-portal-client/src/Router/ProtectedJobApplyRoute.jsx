import React from 'react';
import useAuth from '../hooks/useAuth';
import useRoleHandleSystem from '../hooks/useRoleHandleSystem';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedJobApplyRoute = ({ children, allowedRoles }) => {
    const {user, loading} = useAuth();
    const { roleInfo } = useRoleHandleSystem();
    const location = useLocation();

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user || !roleInfo) {
      return <Navigate to="/login"  state={{ from: location }}  replace />;
    }
  
    if (!allowedRoles.includes(roleInfo.role)) {
 
      return <Navigate to="/unauthorized" />;
    }
  
    return children;
};

export default ProtectedJobApplyRoute;