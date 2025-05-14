import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
 //eta ekhono use kora hoy nai ei hook ta
const useAllJobApplications = () => {
    const axiosSecure = useAxiosSecure();
  
  
    const { data: applications = [], refetch } = useQuery({
      queryKey: ['applications'],
      queryFn: async () => {
        const res = await axiosSecure.get('/job-applications');
        return res.data;
      }
    })
    return [applications, refetch]
    
};

export default useAllJobApplications;