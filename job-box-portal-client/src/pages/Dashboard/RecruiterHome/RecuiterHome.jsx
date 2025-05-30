import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const RecuiterHome = () => {
    const [stats, setStats] = useState([])
    const { user, loading } = useAuth();
    console.log('user name', user.email)
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get(`recruiter-stats?email=${user.email}`)
            .then(res => setStats(res.data));
    }, [user?.email]);
    

 if (loading) return <p>Loading...</p>;

    return (
        <div >
            <h2 className='text-3xl'>
                <span className='text-primary'>Hi Welcome, </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>



            <div>
                <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="text-center h-30  shadow-md rounded-2xl p-4 hover:shadow-xl 
                        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                        <h2 className="text-2xl font-semibold mb-2">Total Job Post</h2>
                        <p className="text-black-700 text-4xl font-bold ">{stats.totalJobs}</p>
                    </div>
                    <div className="text-center h-30  shadow-md rounded-2xl p-4 hover:shadow-xl 
                        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                        <h2 className="text-2xl font-semibold mb-2">Total Application Count</h2>
                        <p className="text-black-700 text-4xl font-bold ">{stats.totalApplications}</p>
                    </div>
                    <div className="text-center h-30  shadow-md rounded-2xl p-4 hover:shadow-xl 
                        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                        <h2 className="text-2xl font-semibold mb-2">Total Approval Jobs</h2>
                        <p className="text-black-700 text-4xl font-bold ">{stats.approvedJobs}</p>
                    </div>
                    <div className="text-center h-30  shadow-md rounded-2xl p-4 hover:shadow-xl 
                        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                        <h2 className="text-2xl font-semibold mb-2">Total Pending Jobs</h2>
                        <p className="text-black-700 text-4xl font-bold ">{stats.pendingJobs}</p>
                    </div>
              

                    
                </div>




            </div>
        </div>
    );
};

export default RecuiterHome;