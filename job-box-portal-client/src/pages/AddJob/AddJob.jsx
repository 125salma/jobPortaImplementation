import React from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddJob = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData.entries())
        //shob data ek sathe paoyar  jonno  fromEntries use kore
        const initialData = Object.fromEntries(formData.entries());
        //console.log(initialData)
        //min, max, currency data alada kore felsi newJob data theke
        const { min, max, currency, ...newJob } = initialData;
        //console.log('object hishabe data pataitesi',min, max, currency, newJob)
        newJob.salaryRange = { min: parseInt(min), max: parseInt(max), currency }
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n')
        console.log(newJob);

        axios.post('http://localhost:5000/jobs', newJob)
        .then(res =>{
            console.log(res.data)
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Job has been added.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/myPostedJobs')
            }
        })
    }
    return (
        <div className='my-20'>
            <h2 className="text-3xl">Post a new Job</h2>
            <form onSubmit={handleAddJob} className="card-body">
                {/* Job title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Job Title</span>
                    </label>
                    <input type="text" name='title' placeholder="Job Title" className="input w-full" required />
                </div>
                {/* job location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Job Location</span>
                    </label>
                    <input type="text" name='location' placeholder="Job Location" className="input w-full" required />
                </div>
                {/* job Type */}
                <div className="form-control ">
                    <label className="label">
                        <span className="label-text text-black">Job Type</span>
                    </label>
                    <select name="jobType"  defaultValue="Pick a Job type" className="select select-ghost ml-2 w-full max-w-xs" required>
                        <option disabled>Pick a Job type</option>
                        <option>Full-time</option>
                        <option>Internship</option>
                        <option>Remote</option>
                        <option>Part-time</option>
                        <option>On-site</option>
                    </select>
                </div>


                {/* job Type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Job Field</span>
                    </label>
                    <select name="jobField"  defaultValue="Pick a Job Field" className="select select-ghost ml-2 w-full max-w-xs" required>
                        <option disabled>Pick a Job Field</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Teaching</option>
                    </select>
                </div>
                {/* salary range */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-end'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Salary Range</span>
                        </label>
                        <input type="number" name='min' placeholder="Min" className="input w-full" required />
                    </div>
                    <div className="form-control">
                        <input type="number" name='max' placeholder="Max " className="input w-full" required />
                    </div>
                    <div className="form-control">
                        <select defaultValue="Currency" name="currency" className="select select-ghost w-full max-w-xs text-black">
                            <option disabled>Currency</option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>INR</option>
                        </select>
                    </div>
                </div>
                {/* Job Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Job Description</span>
                    </label>
                    <textarea className="textarea textarea-bordered w-full" placeholder="Job Description" name="description" required></textarea>
                </div>
                {/* Company Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Company Name</span>
                    </label>
                    <input type="text" name='company' placeholder="Company Name" className="input w-full" required />
                </div>
                {/* requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Job Requirements</span>
                    </label>
                    <textarea className="textarea textarea-bordered w-full" placeholder="put each requirements in a new line" name="requirements" required></textarea>
                </div>
                {/* responsibilities */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Job Responsibilities</span>
                    </label>
                    <textarea className="textarea textarea-bordered w-full" placeholder="Write each responsibility in a new line" name="responsibilities" required></textarea>
                </div>
                {/* HR Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">HR Name</span>
                    </label>
                    <input type="text" name='hr_name' placeholder="HR Name" className="input w-full" required />
                </div>

                {/* HR Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">HR Email</span>
                    </label>
                    <input readOnly type="text" defaultValue={user?.email} name='hr_email' placeholder="HR Email" className="input w-full" required />
                </div>
                {/* application Deadline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Deadline</span>
                    </label>
                    <input type="date" name='applicationDeadline' placeholder="Deadline" className="input w-full" required />
                </div>
                {/* HR Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Company Logo URL</span>
                    </label>
                    <input type="text" name='company_logo' placeholder="Company Logo URL" className="input w-full" required />
                </div>
                {/* submit button */}
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;