import React from 'react';
import useAuth from '../hooks/useAuth';
import useRoleHandleSystem from '../hooks/useRoleHandleSystem';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const RecruiterRoute = ({children}) => {
  const { user, loading, signOutUser } = useAuth(); // 
  const { roleInfo, roleLoading} = useRoleHandleSystem();
  const location = useLocation();
   const navigate = useNavigate()

  if (loading || roleLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }
   
  if (user && roleInfo?.isRecruiter) {
    return children;
  }


  // if (user && !roleInfo?.isRecruiter) {
  //   signOutUser()
  //     .then(() => {
  //       navigate('/')
  //       console.log('User is not admin. Logging out.');
        
  //     })
  //     .catch(err => console.log(err));
  // }

  
    return <Navigate to="/login"  state={location?.pathname}  replace/>;
};

export default RecruiterRoute;