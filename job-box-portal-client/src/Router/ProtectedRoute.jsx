import React, { useContext } from 'react';
import useRoleHandleSystem from '../hooks/useRoleHandleSystem';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
//     // const { user, loading } = useContext(AuthContext);
//     const {user, loading} = useAuth();

//  const { roleInfo } = useRoleHandleSystem();
//  console.log("User:", user);
//  console.log("Loading:", loading);
//  console.log("RoleInfo:", roleInfo);

//  if (loading || !roleInfo) return <div>Loading...</div>;

//  if (user && allowedRoles.includes(roleInfo.role)) {
//    return children;
//  }
//  return <Navigate to="/" />;



const { user, loading } = useAuth();
    const { roleInfo } = useRoleHandleSystem();
    const location = useLocation();

    // এখনও loading চলছে বা roleInfo লোড হয়নি
    if (loading || !roleInfo) {
        return <div>Loading...</div>;
    }

    // যদি user থাকে এবং role অনুমোদিত হয়
    if (user && allowedRoles.includes(roleInfo.role)) {
        return children;
    }

    // unauthorized বা not logged in, তাহলে login page এ পাঠাও
    return <Navigate to="/login" state={location?.pathname} replace />;

};

export default ProtectedRoute;