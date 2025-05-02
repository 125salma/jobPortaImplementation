import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyApplicaion = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {

        // fetch(`https://job-portal-server-for-recruiter-part3-zeta-gules.vercel.app/job-application?email=${user.email}`)
        //     .then(res => res.json())
        //     .then(data => setJobs(data))

        // axios.get(`https://job-portal-server-for-recruiter-part3-zeta-gules.vercel.app/job-application?email=${user.email}`, {
        //     withCredentials: true
        // })
        // .then(res => setJobs(res.data))

        // axios.get(`http://localhost:5000/job-applications?email=${user.email}`, {withCredentials: true})
        //     .then(res => {
        //         setJobs(res.data)

        //     })
        axiosSecure.get(`/job-applications?email=${user.email}`)
        .then(res => {
            setJobs(res.data)
        })


    }, [user.email])

    const handleDelete = id => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // axios.delete(`http://localhost:5000/job-applications/${id}`, {
                    axiosSecure.delete(`/job-applications/${id}`,{
                    data: { email: user.email }
                })
                    .then(res => {
                        console.log(res.data);

                        // if (res.data.success) {
                        //     setJobs(jobs => jobs.filter(job => job._id !== id));
                        //     Swal.fire('Deleted!', 'Your application has been deleted.', 'success');
                        // } else {
                        //   Swal.fire('Error!', res.data.message, 'error');
                        // }

                        if (res.data.deletedCount > 0) {
                            //use refetch() tantack tahole data auometic load hobe
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your job has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        })
    }
    return (
        <div className='my-20'>
            <h2 className="text-3xl">My Applications: {jobs.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Job Type</th>
                            <th>Apply Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            jobs.map((job, index) => <tr key={job._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={job.company_logo}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{job.title}</div>
                                            <div className="text-sm opacity-50">{job.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{job.jobType}</td>
                                <td>{job.appliedAt}</td>
                                <td>
                                    {
                                        job.status? job.status : 'pending'
                                    }
                                </td>
                                <th>
                                    <button onClick={() => handleDelete(job._id)} className="btn btn-ghost btn-xs text-red-600 text-2xl"><FaTrashAlt></FaTrashAlt></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default MyApplicaion;