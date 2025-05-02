import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import PopularJobsCard from '../PopularJobsCard/PopularJobsCard';


const PopularJob = () => {
    //ToDo:
    // const [job] = useJob();
    // const popularJobItems = menu.filter(item => item.category === 'Software Enginner')

    const [jobs, setJobs] = useState([]);

    useEffect(() =>{
        fetch('job.json')
        .then(res => res.json())
        .then(data =>{
            setJobs(data)
    
        })

    },[])
    return (
        <section className="mb-12">
        <SectionTitle
            heading="From Our Jobs"
            subHeading="Popular jobs"
        >
        </SectionTitle>

        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    jobs.map((job,index) => <PopularJobsCard key={index} job={job}></PopularJobsCard>)
                }
            </div>
        </div>
        {/* TODO: */}
        <button className="btn btn-outline btn-primary border-0 border-b-4 mt-4">View Full Job</button>

    </section>
    );
};

export default PopularJob;