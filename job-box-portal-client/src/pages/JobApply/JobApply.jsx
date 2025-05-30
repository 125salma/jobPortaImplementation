import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useJobApplications from '../../hooks/useJobApplications';

const JobApply = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(user)
    //koyta data ase shekhane neyar jonno navigate use
    const navigate = useNavigate();
    const [, refetch] = useJobApplications();

    console.log(id);
    const submitJobApplication = e => {
        e.preventDefault();
        const form = e.target;
        const linkedIn = form.linkedIn.value;
        const github = form.github.value;
        const resume = form.resume.value;
        console.log(linkedIn, github, resume)

        const jobApplication = {
            job_id: id,
            applicant_email: user.email,
            linkedIn,
            github,
            resume,

        }

        // fetch('http://localhost:5000/job-applications', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(jobApplication)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        //     if(data.insertedId){
        //         Swal.fire({
        //             position: "top-end",
        //             icon: "success",
        //             title: "Your work has been saved",
        //             showConfirmButton: false,
        //             timer: 1500
        //           });
        //           navigate('/myApplications')
        //     } 
        // })

        // axios.post('http://localhost:5000/job-applications',jobApplication)
        axiosSecure.post('/job-applications', jobApplication)

            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Application Successfully Submited",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //refetch application to update the applicaion items count
                    refetch();
                    navigate('/dashboard/myApplications')
                }
            })
            .catch(err => {
                if (err.response?.status === 409) {
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "You have already applied for this job!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Something went wrong!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }
    return (


        <div className="card bg-base-100 w-full my-20 shrink-0 shadow-2xl">
            <form onSubmit={submitJobApplication} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">LinkedIn URL</span>
                    </label>
                    <input type="url" name="linkedIn" placeholder="LinkedIn URL" className="input w-full" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Github URL</span>
                    </label>
                    <input type="url" name="github" placeholder="Github URL" className="input w-full" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Resume URL</span>
                    </label>
                    <input type="url" name="resume" placeholder="Resume URL" className="input w-full" required />
                </div>
                {/* <div className="form-control">
                            <label className="label">
                         <span className="label-text text-black">Date</span>
                    </label>
                 <input type="date" name="date" placeholder="Apply Date" className="input w-full" required />
                        </div> */}

                <div className="form-control mt-6">
                    <button className="btn btn-primary w-full">Apply</button>
                </div>
            </form>
        </div>

    );
};

export default JobApply;