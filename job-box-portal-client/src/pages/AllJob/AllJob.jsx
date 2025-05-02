import React, { useState } from 'react';
import useJobs from '../../hooks/useJobs';
import LatesJobsCard from '../Home/LatesJobsCard/LatesJobsCard';
import { BiSearch } from 'react-icons/bi';

const AllJob = () => {
    const [salarySort, setSalarySort] = useState(false);
    const [search, setSearch] = useState("");
    //shudu min er khetre search
    const [minSalary, setMinSalary] = useState("");
    //shudu max er khetre search
    const [maxSalary, setMaxSalary] = useState("");

    const {jobs, loading} = useJobs(salarySort, search, minSalary, maxSalary);
    //console.log(salarySort)
    if(loading){
        return <span className="loading loading-spinner loading-xl my-20"></span>

    }
    return (
        <div className='my-20'>
            <h1 className="text-3xl py-5 font-bold text-center">All Jobs</h1>
            
            <div className="w-11/12 mx-auto bg-base-200 py-5 p-3 flex items-center gap-5">
            <button onClick={() => setSalarySort(!salarySort)} className={`btn btn-neutral ${salarySort && "btn-success"}`}>
            {salarySort == true ? "Sorted By Salary" : "Sort By Salary"}</button>     
            
            <BiSearch></BiSearch>
                <input onKeyUp={(e) => setSearch(e.target.value)}
                    type="text" className="input w-full max-w-2xl"
                    placeholder="Search Jobs By Location,Job_Title,Job_Type,Comapnay_Name" />
            
            <div className="space-y-3">

                    {/* shudu salary search */}
                    <input onKeyUp={(e) => setMinSalary(e.target.value)}
                        type="text" className="input w-full max-w-xs"
                        placeholder="Min Salary" />
                    <input onKeyUp={(e) => setMaxSalary(e.target.value)}
                        type="text" className="input w-full max-w-xs"
                        placeholder="Max Salary" />

                </div>
             </div>


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

            {
                jobs.map(job => <LatesJobsCard key={job._id} job={job}></LatesJobsCard>)
            }
        </div>

        </div>
    );
};

export default AllJob;