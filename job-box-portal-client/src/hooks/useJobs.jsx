import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useJobs = (salarySort, search, minSalary, maxSalary, division, location, startDate, endDate, currentPage, itemsPerPage) => {
 const [jobs, setJobs] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(()=>{
  axios.get(`http://localhost:5000/jobs?salarySort=${salarySort}&search=${search}&min=${minSalary}&max=${maxSalary}&division=${division}&location=${location}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}&size=${itemsPerPage}`)
  .then(res =>{
    setLoading(false);
    setJobs(res.data);
  })
 },[salarySort, search, minSalary, maxSalary, division, location, startDate, endDate, currentPage, itemsPerPage])

//  return [jobs]
return {jobs, loading};
};

export default useJobs;