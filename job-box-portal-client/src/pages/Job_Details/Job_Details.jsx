import moment from 'moment';
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';

const Job_Details = () => {
    const jobs = useLoaderData()
    const { _id, title, company, company_logo, requirements, responsibilities, description, jobType, location, applicationDeadline } = jobs;

    console.log(jobs)
    return (
        <div className='my-20'>

            {/* <p>deadline: {deadline}</p> */}
            <div className="grid gap-4 md:grid-cols-4">
                <div className="border md:col-span-3">

                    <h2 className="text-4xl font-bold text-center text-violet-600">Job Details</h2>
                    <div className='flex gap-2 m-2'>
                        <figure>
                            <img
                                className='w-16'
                                src={company_logo}
                                alt="Shoes" />
                        </figure>
                        <div>
                            <h4 className="text-2xl">{company}</h4>
                            <p className='flex gap-1 items-center'> <FaMapMarkerAlt></FaMapMarkerAlt> {location}</p>
                            <small>
                                <p>Posted: {moment(new Date(jobs.createdAt)).fromNow()}</p>
                            </small>
                        </div>
                    </div>
                    <p className="p-3 "><span className="font-bold">Job Details of:</span> <span className="text-[#757575]">{title}</span> </p>

                    <p className="p-3 "><span className="font-bold">Company Name:</span> <span className="text-[#757575]">{company}</span> </p>

                    <p className="p-3 "><span className="font-bold">Job Description:</span> <span className="text-[#757575]">{description}</span> </p>

                    <p className="p-3 "><span className="font-bold">Job Responsibility:</span> <span className="text-[#757575]">
                        {
                            jobs.responsibilities.map((res, index) => <li key={index}>{res}</li>)
                        }
                        {/* {jobs.responsibilities} */}

                    </span></p>

                    <p className="p-3 "><span className="font-bold">Job Requirements:</span> <span className="text-[#757575]">
                        {
                            jobs.requirements.map((req, index) => <li key={index}>{req}</li>)
                        }
                    </span></p>


                    <p className="p-3 "><span className="font-bold"> DeadLine: </span>{applicationDeadline}<span className="text-[#757575]"></span></p>

                </div>

                <div className="border">
                    <h2 className="text-2xl font-bold mb-4 text-center">Side things</h2>
                    <div className='mb-6'>
                        <p className="p-2"><span className="font-bold"> Job Type: </span>{jobType}<span className="text-[#757575]"></span></p>
                        <p className="p-2 "><span className="font-bold"> Location: </span>{location}<span className="text-[#757575]"></span></p>
                    </div>
                    <Link to={`/jobApply/${_id}`}>
                        <button className='btn btn-primary w-full'>Apply Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Job_Details;