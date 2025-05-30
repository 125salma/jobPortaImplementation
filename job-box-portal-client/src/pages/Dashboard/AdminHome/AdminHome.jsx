import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
//daily active users
import { BarChart, LineChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
//weekly job post



const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  })
  //daily active users
  const { data: dailyUsers = [] } = useQuery({
    queryKey: ['daily-Users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/daily-active-users');
      console.log(res.data)
      return res.data;
    }
  })

  //weekly post
  const { data: weeklyJobPost = [] } = useQuery({
    queryKey: ['weekly-job-post'],
    queryFn: async () => {
      const res = await axiosSecure.get('/weekly-jobs');
      console.log(res.data)
      return res.data;
    }
  })


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  return (
    <div className='text-3xl'>
      <h2>
        <span className='text-primary'>Hi Welcome, </span>
        {
          user?.displayName ? user.displayName : 'Back'
        }
      </h2>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="text-center h-30  shadow-md rounded-2xl p-4 hover:shadow-xl 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Total Users</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.users}</p>
        </div>

        <div className="text-center h-30  shadow-md rounded-2xl p-4 hover:shadow-xl 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Total Jobs</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.jobCollection}</p>
        </div>
        <div className="text-center h-30 shadow-md rounded-2xl p-4 hover:shadow-xl 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Total Applications</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.jobApplication}</p>
        </div>
        <div className="text-center h-30 shadow-md rounded-2xl p-4 hover:shadow-xl 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Total Admin</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.adminUsers}</p>
        </div>
        <div className="text-center h-30 shadow-md rounded-2xl p-4 hover:shadow-xl 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Total Recruiter</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.recruiterUsers}</p>
        </div>
        <div className="text-center h-30 shadow-md rounded-2xl p-4 hover:shadow-xl 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Total Users</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.userUsers}</p>
        </div>
        <div className="text-center h-30 0  shadow-md rounded-2xl p-4 hover:shadow-xl 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Total Pending Jobs</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.pendingJobs}</p>
        </div>
        <div className="text-center h-30  shadow-md rounded-2xl p-4 hover:shadow-xl 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Total Active Jobs</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.activeJobs}</p>
        </div>
        <div className="text-center h-30lg:w-60 shadow-md rounded-2xl p-4 hover:shadow-xl 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Reject Applications</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.rejectApplications}</p>
        </div>
        <div className="text-center h-30  shadow-md rounded-2xl p-4 hover:shadow-xl 
          bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          <h2 className="text-2xl font-semibold mb-2">Accepted Applications</h2>
          <p className="text-black-700 text-4xl font-bold ">{stats.acceptedApplications}</p>
        </div>

      </div>

      {/* daily active users */}
      <div className='my-14'>
        <h2 className="text-2xl font-semibold mb-4">Daily Active Users</h2>
        <BarChart
          width={500}
          height={300}
          data={dailyUsers}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="activeUsers" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </div>


      {/* weekly job post */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Weekly Job Post</h2>

        <LineChart
          width={500}
          height={300}
          data={weeklyJobPost}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weekRange" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
          <Line type="monotone" dataKey="jobs" stroke="#82ca9d" />
        </LineChart>
      </div>

    </div>


  );
};

export default AdminHome;