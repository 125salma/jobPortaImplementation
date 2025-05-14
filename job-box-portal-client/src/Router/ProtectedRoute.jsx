import React, { useContext } from 'react';
import useRoleHandleSystem from '../hooks/useRoleHandleSystem';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
    // const { user, loading } = useContext(AuthContext);
    const {user, loading} = useAuth();

 const { roleInfo } = useRoleHandleSystem();
 console.log("User:", user);
 console.log("Loading:", loading);
 console.log("RoleInfo:", roleInfo);

 if (loading || !roleInfo) return <div>Loading...</div>;

 if (user && allowedRoles.includes(roleInfo.role)) {
   return children;
 }
 return <Navigate to="/" />;

};

export default ProtectedRoute;