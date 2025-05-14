import React from 'react';
import useAuth from '../hooks/useAuth';
import useRoleHandleSystem from '../hooks/useRoleHandleSystem';
import { Navigate, useLocation} from 'react-router-dom';

const UserRoute = ({ children}) => {
   const { user, loading } = useAuth(); // 
  const { roleInfo, roleLoading} = useRoleHandleSystem();
  const location = useLocation();
  

  if (loading || roleLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }
   
  if (user && roleInfo?.user) {
    return children;
  }
  
    return <Navigate to="/login"  state={{ from: location }} />;
};

export default UserRoute;