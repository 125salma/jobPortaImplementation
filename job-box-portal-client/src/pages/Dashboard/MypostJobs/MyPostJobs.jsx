import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useLatestJobs from '../../../hooks/useLatestJobs';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const MyPostJobs = () => {
    // const [jobs, setJobs] = useState([]);
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
   

    // useEffect(() => {

    //     axios.get(`https://job-box-portal-server.vercel.app/jobs?email=${user.email}`)
    //         .then(res => {
    //             setJobs(res.data)
    //             console.log(res.data)
    //         })
    // }, [user.email])

//using tanstack query
    const { data: jobs = [], isLoading, error, refetch } = useQuery({
        queryKey: ['jobs', user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`https://job-box-portal-server.vercel.app/jobs?email=${user.email}`)
          return res.data
        },
        enabled: !!user?.email,
      })

    //delete add jobs
    const handleDeleteJob = job => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/jobs/${job._id}`)
                //console.log(res.data)
                if (res.data.deletedCount > 0) {
                    //refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${job.title} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }

            }
        });
    }

    return (
        <div>
            <SectionTitle
             heading= {`My Posted Jobs: ${jobs.length}`}
              subHeading="Job control"></SectionTitle>
            {/* <h2 className='text-3xl text-center'>My Posted Jobs: {jobs.length}</h2> */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Title</th>
                            <th>Job Status</th>
                            <th>Deadline</th>
                            <th>Application Count</th>
                            <th>Applications</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map((job, index) => <tr key={job._id}>
                                <th>{index + 1}</th>
                                <td>{job.title}</td>
                                <td>{job.status ? job.status : 'pending'}</td>
                                <td className='text-center'>{job.applicationDeadline}</td>
                                <td className='text-center'>{job.applicationCount}</td>
                                {/* users application count */}
                                <td>
                                <Link to={`viewApplications-job/${job._id}`}>
                                        <button className='btn btn-link'>View Applications</button>
                                    </Link>
                                </td>
                                {/* update jobs */}
                                <td>
                                    <Link to={`updateJobs/${job._id}`}>
                                        <button className="btn btn-ghost btn-sm bg-orange-500">
                                            <FaEdit className='text-white'></FaEdit></button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteJob(job)} className="btn btn-ghost btn-xs text-red-600 text-2xl">
                                        <FaTrashAlt></FaTrashAlt></button>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostJobs;