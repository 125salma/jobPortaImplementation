import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LatesJobsCard from '../LatesJobsCard/LatesJobsCard';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
 const navigate = useNavigate()

  useEffect(() => {
    axios.get('https://job-box-portal-server.vercel.app/jobs?salarySort=false')
      .then(res => {
        setJobs(res.data)
      })
  }, [])



  return (
    <div className='my-10'>
      <h2 className="text-5xl text-center font-bold mt-14 text-violet-600 mb-4">Recent Jobs</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          jobs.slice(0, 6).map(job => <LatesJobsCard key={job._id} job={job}></LatesJobsCard>)
        }
      </div>


      <div className="grid justify-items-center mt-4">
          <button
            onClick={() => navigate('/jobs')}
            className="btn btn-primary bg-gradient-to-r from-indigo-400"
          >
          View All Jobs...
          </button>
        </div>
      </div>
   
  );
};

export default LatestJobs;