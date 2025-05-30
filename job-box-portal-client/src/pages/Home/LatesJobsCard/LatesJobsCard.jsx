import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LatesJobsCard = ({ job }) => {
    const { _id, title, company, company_logo, jobType, requirements, description, location, salaryRange } = job;

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <div className='flex gap-2 m-2'>
                <figure>
                    <img
                        className='w-16'
                        src={company_logo}
                        alt="" />
                </figure>
                <div>
                    <h4 className="text-2xl">{company}</h4>
                    <p className='flex gap-1 items-center'> <FaMapMarkerAlt></FaMapMarkerAlt> {location}</p>
                    <p className='text-primary'>{jobType}</p>
                    <small>
                        <p>Posted: {moment(new Date(job.createdAt)).fromNow()}</p>
                    </small>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{description}</p>
                <div className='flex gap-2 flex-wrap'>
                    {
                        requirements.map((skill, index) => <p
                            key={index}
                            className='border rounded-md text-center px-2 hover:text-purple-600 hover:bg-gray-400'
                        >{skill}</p>)
                    }

                </div>

                <div>
                    <p>StartAt: {new Date(job.createdAt).toISOString().split("T")[0]} - EndAt: {job.applicationDeadline}</p>
                </div>
                <div className="card-actions justify-end items-center mt-4">

                    <p className='flex items-center'>Salary: <FaDollarSign></FaDollarSign> {salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>


                    <Link to={`/jobs/${_id}`}>
                        <button className="btn btn-primary">Apply</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LatesJobsCard;