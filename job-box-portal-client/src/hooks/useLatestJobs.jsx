import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const useLatestJobs = () => {
    const {data: jobs = [],isLoading,refetch,isError, } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await axios.get('https://job-box-portal-server.vercel.app/jobs?salarySort=false');
      return res.data;
    }
  });

  return [jobs, isLoading, refetch, isError];

};

export default useLatestJobs;