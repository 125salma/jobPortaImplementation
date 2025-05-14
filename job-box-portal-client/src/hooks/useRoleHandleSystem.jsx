import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import axios from 'axios';

const useRoleHandleSystem = () => {
    const { user, loading  } = useAuth();
    const axiosSecure = useAxiosSecure();
   

    const {
      data: roleInfo = {}, // roleInfo = { role, isAdmin, isRecruiter }
      isLoading: roleLoading,
      refetch,
      isError,
      error
    } = useQuery({
      enabled: !loading && !!user?.email,
      queryKey: ['user-role', user?.email],
      queryFn: async () => {
        const res = await axios.get(`http://localhost:5000/users/role/${user.email}`, {withCredentials: true});
        console.log(res.data)
        return res.data;
      }
    });
  
    return { roleInfo, roleLoading, refetch, isError, error };
    
 
    
};

export default useRoleHandleSystem;