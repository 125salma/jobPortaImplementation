import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LatesJobsCard from '../LatesJobsCard/LatesJobsCard';

const LatestJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/jobs?salarySort=false')
      .then(res =>{
        setJobs(res.data)
      })
    }, [])
   


    return (
        <div className='my-20'>
          <h2 className="text-3xl text-center">Feature Jobs</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
                jobs.map(job => <LatesJobsCard key={job._id} job={job}></LatesJobsCard>)
            }
        </div>
    </div>
    );
};

export default LatestJobs;