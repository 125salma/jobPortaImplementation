import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const ViewApplications_job = () => {
    const applications = useLoaderData();
    const axiosSecure = useAxiosSecure();
    console.log(applications)

    const handleStatusUpdate = (e,id) =>{
        console.log(e.target.value, id);

        const data = {
            status: e.target.value
        }
        // axios.patch(`http://localhost:5000/job-applications/${id}`, data, {withCredentials: true})
        axiosSecure.patch(`/job-applications/${id}`,data)
        .then(res => {
            if (res.data.modifiedCount) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Status Has been updated.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }
    return (
        <div>
            <SectionTitle heading={`Applications for this job: ${applications.length}`} subHeading="Application Tracker"></SectionTitle>
        <h2 className="text-3xl"></h2>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>Applicant Data</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applications.map((app, index) => <tr key={app._id}>
                            <th>{index + 1}</th>
                            <td>{app.applicant_email}</td>
                            <td>{app.linkedIn}</td>
                           
                            <td>
                                <select
                                    onChange={(e) => handleStatusUpdate(e, app._id)}
                                    defaultValue={app.status || 'Change Status'}
                                    className="select select-bordered select-xs w-full max-w-xs">
                                    <option disabled>Change Status</option>
                                    <option>Under Review</option>
                                    <option>Set Interview</option>
                                    <option>Hired</option>
                                    <option>Rejected</option>
                                </select>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ViewApplications_job;