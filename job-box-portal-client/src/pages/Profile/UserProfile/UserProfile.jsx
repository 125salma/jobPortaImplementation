import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const UserProfile = () => {
    const { user } = useAuth();
    const { email } = useParams();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    // STEP 1: GET → Fetch data from backend

    useEffect(() => {

        axiosPublic.get(`/user-profile/${email}`)
            .then(res => {
                setProfile(res.data);
                setLoading(false);
            });

    }, [email]);

    console.log(profile)

    if (loading) return <p>Loading profile...</p>;
    return (
        <div className='my-20'>
            {/* <Link to="/editProfile">Edit</Link>
            */}



            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl ">

                {/* Cover Photo Section */}
                <div className="relative h-48 md:h-64 bg-gray-300">
                    <img
                        src={profile.coverPhoto}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />

                    {/* Profile Picture - Overlapping */}
                    <div className="absolute -bottom-16 left-6">
                        <img
                            src={profile.photo}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                        />
                    </div>
                </div>

                {/* Profile Info Section */}
                <div className="pt-20 pb-8 ">
                    <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                    <p className="text-gray-600 text-sm">{profile.headline}</p>
                    <p className="text-gray-500 text-sm">{profile.email}</p>
                    {profile.country && <p className="text-gray-500 text-sm">{profile.country}</p>}

                    {profile.linkedin && (
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 text-blue-600 underline"
                        >
                            View LinkedIn Profile
                        </a>
                    )}
                </div>
                <hr />

                {/* Top Section */}
                {/* <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6">
                    <img
                        src={profile.photo}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                    />

                    <div>
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="text-gray-600">{profile.headline}</p>
                        <p className="text-sm text-gray-500">{profile.email}</p>
                        <p className="text-sm text-gray-500">{profile.country}</p>
                        {profile.linkedin && (
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline mt-2 block"
                            >
                                View LinkedIn Profile
                            </a>
                        )}
                    </div>
                </div> */}

                {/*Edit button only for profile owner */}
                <div>
                    {
                        user && user.email === email  && (
                            <Link
                                to="/editProfile"
                                className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 "
                            >
                                Edit Profile
                            </Link>

                        )
                    }

                </div>


                {/* About Section */}
                <div>
                    {profile.about && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">About</h3>
                            <p className="text-gray-700 mt-2">{profile.about}</p>
                        </div>
                    )}
                </div>

                {/* Skills Section */}
                <div>
                    {profile.skills?.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Skills</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {profile.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Experience Section */}
                <div>
                    {profile.experience?.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Experience</h3>
                            {profile.experience.map((exp, i) => (
                                <div key={i} className="mt-2 border-l-4 border-blue-400 pl-4">
                                    <p className="font-medium">{exp.company}</p>
                                    <p className="font-medium">{exp.role}</p>
                                    <p className="text-sm text-gray-600">
                                        {exp.from} - {exp.to || 'Present'}
                                    </p>
                                    <p className="text-gray-700 mt-1">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Education Section */}
                <div>
                    {profile.education?.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Education</h3>
                            {profile.education.map((edu, i) => (
                                <div key={i} className="mt-2 border-l-4 border-green-400 pl-4">
                                    <p className="font-medium">{edu.institute}</p>
                                    <p className="font-medium">{edu.degree}</p>
                                    <p className="text-sm text-gray-600">{edu.institute} . {edu.period}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Address Section */}
                <div className="mt-6 ">
                    <h3 className="text-xl font-semibold">Addresses</h3>
                    <div className='border-l-4 border-orange-400 pl-4 mt-2'>
                        <p><strong>Country:</strong> {profile.country}</p>
                        <p><strong>Current:</strong> {profile.currentAddress}</p>
                        <p><strong>Permanent:</strong> {profile.prmanentAddress}</p>
                    </div>
                </div>
                {/* Social Links */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Social Links</h3>
                    {profile.github && (
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline mt-2 block"
                        >
                            View Github Profile
                        </a>
                    )}

                    {profile.portfolio && (
                        <a
                            href={profile.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline mt-2 block"
                        >
                            View Portfolio
                        </a>
                    )}


                </div>

            </div>





        </div>
    );
};

export default UserProfile;