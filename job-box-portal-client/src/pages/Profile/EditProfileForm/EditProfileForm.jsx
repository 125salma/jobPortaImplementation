import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const EditProfileForm = () => {
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    headline: "",
    about: "",
    skills: "",
    experience: [{ title: '', company: '', location: '', from: '', to: '', description: '' }],
    education: [{ institute: '', degree: '', period: '' }],
    linkedin: "",
    github: "",
    portfolio: "",
    country: "",
    currentAddress: "",

  });






  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  // Experience and education dynamic handlers
  function handleExperienceChange(index, e) {
    const { name, value } = e.target;
    const exp = [...formData.experience];
    exp[index][name] = value;
    setFormData(prev => ({ ...prev, experience: exp }));
  }

  //education
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const edu = [...formData.education];
    edu[index][name] = value;
    setFormData(prev => ({ ...prev, education: edu }));
  }





  // age data put diye database e save korte hobe
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
    };
    console.log(dataToSave)
    await axiosSecure.put(`/profiles/${user.email}`, dataToSave);
    // alert("Profile saved!");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Profile saved",
      showConfirmButton: false,
      timer: 1500
    });
  };



  return (




    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">


        <div>
          <label className="block text-gray-700"><strong>Headline</strong></label>
          <input
            type="text"
            name="headline"
            value={formData.headline} onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Headline"
          />
        </div>
        <div>
          <label className="block text-gray-700"><strong>About</strong></label>
          <textarea
            name="about"
            value={formData.about} onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="About you"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700"><strong>Skills</strong></label>
          <input
            type="text"
            name="skills"
            value={formData.skills} onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Skills (comma-separated)" />
        </div>
        {/* Experience */}

        <div>
          <label className="block text-gray-700"><strong>Experience</strong></label>

          {formData.experience.map((exp, i) => (
            <div className='flex gap-6' key={i}>
              <input name="title" className="w-full border border-gray-300 p-2 rounded" placeholder="Title" value={exp.title} onChange={e => handleExperienceChange(i, e)} />
              <input name="company" className="w-full border border-gray-300 p-2 rounded" placeholder="Company" value={exp.company} onChange={e => handleExperienceChange(i, e)} />
              <input name="location" className="w-full border border-gray-300 p-2 rounded" placeholder="Location" value={exp.location} onChange={e => handleExperienceChange(i, e)} />
              <input name="from" className="w-full border border-gray-300 p-2 rounded" placeholder="From" value={exp.from} onChange={e => handleExperienceChange(i, e)} />
              <input name="to" className="w-full border border-gray-300 p-2 rounded" placeholder="To" value={exp.to} onChange={e => handleExperienceChange(i, e)} />
              <textarea name="description" className="w-full border border-gray-300 p-2 rounded" placeholder="Description" value={exp.description} onChange={e => handleExperienceChange(i, e)} />
            </div>
          ))}
        </div>

        {/* Education */}

        <div>
          <label className="block text-gray-700"><strong>Education</strong></label>

          {formData.education.map((edu, i) => (
            <div className='flex gap-6' key={i}>
              <input name="institute" className="w-full border border-gray-300 p-2 rounded" placeholder="Institute" value={edu.institute} onChange={e => handleEducationChange(i, e)} />
              <input name="degree" className="w-full border border-gray-300 p-2 rounded" placeholder="Degree" value={edu.degree} onChange={e => handleEducationChange(i, e)} />
              <input name="period" className="w-full border border-gray-300 p-2 rounded" placeholder="Period" value={edu.period} onChange={e => handleEducationChange(i, e)} />
            </div>
          ))}
          {/* <button type="button" className='btn' onClick={addEducation}>Add Education</button> */}
        </div>

        {/* linkedin */}
        <div>
          <label className="block text-gray-700"><strong>Linkedin</strong></label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin} onChange={handleChange}
            placeholder="LinkedIn URL"
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/* github */}
        <div>
          <label className="block text-gray-700"><strong>GitHub</strong></label>
          <input
            type="text"
            name="github"
            value={formData.github} onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="GitHub URL" />
        </div>


        {/* Portfolio URL */}
        <div>
          <label className="block text-gray-700"><strong>Portfolio URL</strong></label>
          <input type="text"
            name="portfolio"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Portfolio URL" value={formData.portfolio} onChange={handleChange} />
        </div>
        {/* Country */}
        <div>
          <label className="block text-gray-700"><strong>Country</strong></label>
          <input type="text" name="country"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Country" value={formData.country} onChange={handleChange} />
        </div>
        {/* Current Address */}
        <div>
          <label className="block text-gray-700"><strong>Current Address</strong></label>
          <input type='text' name="currentAddress"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Current Address"
            value={formData.currentAddress} onChange={handleChange} />
        </div>
        {/* Permanent Address*/}
        <div>
          <label className="block text-gray-700"><strong>Permanent Address</strong></label>
          <input type='text' name="prmanentAddress"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Permanent Address"
            value={formData.permanentAddress} onChange={handleChange} />
        </div>



        {/* submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;