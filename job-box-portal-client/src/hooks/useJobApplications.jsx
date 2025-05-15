import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import axios from "axios";


const useJobApplications = () => {
//tan stack query
const axiosSecure = useAxiosSecure();
const {user} = useAuth()

const {refetch , data: jobs = []} = useQuery({
  queryKey: ['jobs', user?.email],
  queryFn: async () =>{
      // const res = await axiosSecure.get(`/job-applications?email=${user.email}`)
      const res = await axios.get(`https://job-box-portal-server.vercel.app/job-applications?email=${user.email}`,{withCredentials: true})
      return res.data;
  }
})
return [jobs, refetch]
};

export default useJobApplications;