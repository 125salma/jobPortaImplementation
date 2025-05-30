import React from 'react';
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaList, FaSearch, FaUsers } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import useRoleHandleSystem from '../hooks/useRoleHandleSystem';
import { MdRateReview } from 'react-icons/md';
import useJobApplications from '../hooks/useJobApplications';

const Dashboard = () => {
  const [jobs] = useJobApplications();
  //TODO: get isAdmin value from the database

  const { roleInfo } = useRoleHandleSystem()
  return (

    <div className='flex'>
      {/* dashboard side bar */}
      <div className='w-64 min-h-screen bg-blue-400'>
        <ul className='menu fixed z-10'>
          {roleInfo.isAdmin && (
            <>
              <li><NavLink to="/dashboard/adminHome"><FaHouse /> Admin Home</NavLink></li>
              <li><NavLink to="/dashboard/approve"><FaList /> Approve Jobs</NavLink></li>
              <li><NavLink to="/dashboard/users"><FaUsers /> All Users</NavLink></li>
              <li><NavLink to="/dashboard/addJobs"><FaAd /> Add Jobs</NavLink></li>
              <li><NavLink to="/dashboard/myPostJobs"><FaBook /> My Posted jobs</NavLink></li>
              <li><NavLink to="/dashboard/contact-messages"><FaEnvelope /> User Contact SMS</NavLink></li>

              {/* <li><NavLink to="/dashboard/myApplications"><FaBook /> My Applications</NavLink></li> */}

            </>
          )}

          {roleInfo.isRecruiter && (
            <>
              <li><NavLink to="/dashboard/recruiterHome"><FaHouse /> Recruiter Home</NavLink></li>
              <li><NavLink to="/dashboard/addJobs"><FaAd /> Add Jobs</NavLink></li>
              <li><NavLink to="/dashboard/myPostJobs"><FaBook /> My Posted jobs</NavLink></li>

            </>
          )}

          {!roleInfo.isAdmin && !roleInfo.isRecruiter && (
            <>
              <li><NavLink to="/dashboard/userHome"><FaHouse /> User Home</NavLink></li>

              <li><NavLink to="/dashboard/myApplications"><FaBook />

                <div className="indicator">
                  <span className="indicator-item text-primary pb-2 ">+{jobs.length}</span>
                  <p>My Applications</p>
                </div>

              </NavLink></li>

              <li><NavLink to="/dashboard/myReviewDetails"><MdRateReview />
                My Review Details</NavLink></li>
              <li><NavLink to="/dashboard/reviews"><FaAd /> Add a Review</NavLink></li>
            </>
          )}

          <div className="divider"></div>

          {/* Shared nav links */}
          <li><NavLink to="/"><FaHouse /> Home</NavLink></li>
          <li><NavLink to="/jobs"><FaSearch /> All Jobs</NavLink></li>
          <li><NavLink to="contact"><FaEnvelope /> Contact</NavLink></li>
        </ul>
      </div>

      {/* dashboard content */}
      <div className='flex-1 p-8'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;