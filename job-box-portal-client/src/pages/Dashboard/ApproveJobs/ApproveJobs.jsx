import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import moment from 'moment';

const ApproveJobs = () => {
    const [jobs, setJobs] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get('/admin/jobs')
            .then(res => setJobs(res.data));
    }, []);

    const handleStatusChange = (id, status) => {
        axiosSecure.patch(`/jobs/${id}/status`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Status updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setJobs(jobs => jobs.map(job =>
                        job._id === id ? { ...job, status } : job
                    ));
                }
            });
    };
    return (
        <div>
            <SectionTitle heading="Pending Job Approvals" subHeading="All jobs must be verified before publishing"></SectionTitle>
            <div className='mt-4'>
                {jobs.map(job => (
                    <div key={job._id} className="p-4 shadow rounded border mb-2">
                        <h3><strong>Job Title: </strong>{job.title}</h3>
                        <h3><strong>Company Name: </strong> {job.company}</h3>
                        <h3>{job.hr_email}</h3>
                        <small>
                            <p><strong>Posted: </strong>{moment(new Date(job.createdAt)).fromNow()}</p>
                        </small>
                        <p>Status: <span className="font-semibold">{job.status}</span></p>
                        <select
                            value={job.status}
                            onChange={(e) => handleStatusChange(job._id, e.target.value)}
                            className="border px-2 py-1 rounded ml-2"
                        >
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ApproveJobs;