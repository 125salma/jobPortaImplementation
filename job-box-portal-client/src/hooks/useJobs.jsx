import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useJobs = (salarySort, search, minSalary, maxSalary) => {
 const [jobs, setJobs] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(()=>{
  axios.get(`https://job-box-portal-server.vercel.app/jobs?salarySort=${salarySort}&search=${search}&min=${minSalary}&max=${maxSalary}`)
  .then(res =>{
    setLoading(false);
    setJobs(res.data);
  })
 },[salarySort, search, minSalary, maxSalary])

//  return [jobs]
return {jobs, loading};
};

export default useJobs;