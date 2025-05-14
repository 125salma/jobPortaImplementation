import React from 'react';
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaList, FaSearch, FaUsers } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import useRoleHandleSystem from '../hooks/useRoleHandleSystem';
import { MdRateReview } from 'react-icons/md';

const Dashboard = () => {
  //TODO: get isAdmin value from the database

  const { roleInfo } = useRoleHandleSystem()
  return (
    // <div className='flex'>
    //     {/* dashboard side bar */}
    //     <div className='w-64 min-h-screen bg-orange-400'>
    //         <ul className='menu'>

    //             {
    //                 isAdmin ? <>
    //                 <li><NavLink to="/dashboard/adminHome">
    //             <FaHouse></FaHouse>
    //             Admin Home</NavLink></li>

    //             <li><NavLink to="/dashboard/addjobs">
    //             <FaBook></FaBook>
    //              Add jobs</NavLink></li>

    //             <li><NavLink to="/dashboard/manageUsers">
    //             <FaList></FaList>
    //             Manage Users</NavLink></li>

    //             <li><NavLink to="/dashboard/myPostedJobs">
    //             <FaList></FaList>
    //             My Posted Jobs</NavLink></li>

    //             <li><NavLink to="/dashboard/viewApplications">
    //             <FaList></FaList>
    //             ViewApplications</NavLink></li>

    //             <li><NavLink to="/dashboard/users">
    //             <FaUsers></FaUsers>
    //              All Users</NavLink></li>
    //                 </> :
    //                 <>
    //                 <li><NavLink to="/dashboard/UserHome">
    //             <FaHouse></FaHouse>
    //             User Home</NavLink></li>

    //             <li><NavLink to="/dashboard/myApplications">
    //             <FaBook></FaBook>
    //             My Application</NavLink></li>

    //             <li><NavLink to="/dashboard/reservations">
    //             <FaCalendar></FaCalendar>
    //             Reservation</NavLink></li>

    //             <li><NavLink to="/dashboard/review">
    //             <FaAd></FaAd>
    //              Add a Review</NavLink></li>
    //                 </>
    //             }



    //              <div className="divider"></div>
    //              {/* sheared nav links */}
    //              <li><NavLink to="/">
    //             <FaHouse></FaHouse>
    //              Home</NavLink></li>

    //              <li><NavLink to="/jobs">
    //             <FaSearch></FaSearch>
    //              All Jobs</NavLink></li>

    //              <li><NavLink to="/jobs">
    //             <FaEnvelope></FaEnvelope>
    //              Contact</NavLink></li>

    //         </ul>
    //     </div>
    //     {/* dashboard content */}
    //     <div className='flex-1 p-8'>
    //         <Outlet></Outlet>
    //     </div>
    // </div>






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
              <li><NavLink to="/dashboard/contact-messages"><FaBook /> User Contact SMS</NavLink></li>

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
              <li><NavLink to="/dashboard/myApplications"><FaBook /> My Applications</NavLink></li>
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