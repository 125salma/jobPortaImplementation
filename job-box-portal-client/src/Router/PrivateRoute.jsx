import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);

    if (loading) {
        return <span className="loading loading-ring loading-lg"></span>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login"  state={location?.pathname}  replace></Navigate>
};

export default PrivateRoute;