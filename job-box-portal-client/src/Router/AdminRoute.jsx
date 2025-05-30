import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useRoleHandleSystem from '../hooks/useRoleHandleSystem';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({children}) => {
  const { user, loading, signOutUser } = useAuth(); // 
  const { roleInfo, roleLoading} = useRoleHandleSystem();
  const location = useLocation();
  //  const navigate = useNavigate()

  if (loading || roleLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }
   
  if (user && roleInfo?.isAdmin) {
    return children;
  }


  // if (user && !roleInfo?.isAdmin) {
  //   signOutUser()
  //     .then(() => {
  //       navigate('/')
  //       console.log('User is not admin. Logging out.');
        
  //     })
  //     .catch(err => console.log(err));
  // }

  
    return <Navigate to="/"  state={location?.pathname} replace/>;
  
};

export default AdminRoute;