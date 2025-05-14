import React from 'react';
import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home/Home';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Job_Details from '../pages/Job_Details/Job_Details';
import PrivateRoute from './PrivateRoute';
import JobApply from '../pages/JobApply/JobApply';
// import MyApplicaion from '../pages/MyApplication/MyApplicaion';
// import AddJob from '../pages/AddJob/AddJob';
// import MyPostedJobs from '../pages/MyPostedJobs/MyPostedJobs';
// import ViewApplications from '../pages/ViewApplications/ViewApplications';
import AllJob from '../pages/AllJob/AllJob';
import Dashboard from '../layout/Dashboard';
import MyApplication from '../pages/Dashboard/MyApplication/MyApplication';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import AdminRoute from './AdminRoute';
import MyPostJobs from '../pages/Dashboard/MypostJobs/MyPostJobs';
import AddJobs from '../pages/Dashboard/AddJobs/AddJobs';
// import ViewJobApplications from '../pages/Dashboard/ViewJobApplications/ViewJobApplications';
import ViewApplications_job from '../pages/Dashboard/ViewApplications_Job/ViewApplications_job';
import UpadateJobs from '../pages/Dashboard/UpdateJobs/UpadateJobs';
import UserHome from '../pages/Dashboard/UserHome/UserHome';
import AdminHome from '../pages/Dashboard/AdminHome/AdminHome';
import RecuiterHome from '../pages/Dashboard/RecruiterHome/RecuiterHome';
import ProtectedRoute from './ProtectedRoute';
import UnAuthorized from '../pages/UnAuthorized/UnAuthorized';
import ProtectedJobApplyRoute from './ProtectedJobApplyRoute';
import ApproveJobs from '../pages/Dashboard/ApproveJobs/ApproveJobs';
import Reviews from '../pages/Dashboard/Reviews/Reviews';
import ReviewDetails from '../pages/Dashboard/ReviewDetails/ReviewDetails';
import AllReviews from '../pages/AllReviews/AllReviews';
import MyReviewDetails from '../pages/Dashboard/MyReviewDetails/MyReviewDetails';
import UpdateReviews from '../pages/Dashboard/UpdateReviews/UpdateReviews';
import Contact from '../pages/Contact/Contact';
import ContactSMS from '../pages/Dashboard/ContactSMS/ContactSMS';






const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'jobs',
        element: <PrivateRoute><AllJob></AllJob></PrivateRoute>
      },
      {
        path: '/jobs/:id',
        element: <PrivateRoute><Job_Details></Job_Details></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)

      },
      {
        path: '/jobApply/:id',
        // element: <PrivateRoute><JobApply></JobApply></PrivateRoute>
        element: (
          <ProtectedJobApplyRoute allowedRoles={['user']}><JobApply></JobApply></ProtectedJobApplyRoute>
        )
      },
      // {
      //   path: '/myApplications',
      //   element: <PrivateRoute><MyApplicaion></MyApplicaion></PrivateRoute>
      // },
      // {
      //   path: '/myPostedJobs',
      //   element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
      // },
      // {
      //   path: '/viewApplications/:job_id',
      //   element: <PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
      //   loader: ({params}) => fetch(`http://localhost:5000/job-applications/jobs/${params.job_id}`)

      // },
      {
        path: '/addJob',
        // element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/allReviews',
        element: <PrivateRoute><AllReviews></AllReviews></PrivateRoute>
      },
      {
        path: '/contact/:id',
        element: <PrivateRoute><Contact></Contact></PrivateRoute>
      },
      {
        path: '/unauthorized',
        element: <UnAuthorized></UnAuthorized>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      //normal users
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: 'myApplications',
        element: <MyApplication></MyApplication>
      },
      //admin routes
      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'addJobs',
        //element: <AdminRoute><AddJobs></AddJobs></AdminRoute>
        element: (
          <ProtectedRoute allowedRoles={['admin', 'recruiter']}><AddJobs></AddJobs></ProtectedRoute>
        )
      },
      {
        path: 'myPostJobs/updateJobs/:id',
        // element:<AdminRoute><UpadateJobs></UpadateJobs></AdminRoute>,
        // loader: ({params}) => fetch(`http://localhost:5000/jobs/${params.id}`)
        element: (
          <ProtectedRoute allowedRoles={['admin', 'recruiter']}><UpadateJobs></UpadateJobs></ProtectedRoute>
        ),
        loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)

      },
      {
        path: 'myPostJobs',
        // element: <AdminRoute><MyPostJobs></MyPostJobs></AdminRoute>
        element: (
          <ProtectedRoute allowedRoles={['admin', 'recruiter']}><MyPostJobs></MyPostJobs></ProtectedRoute>
        )

      },
      {
        path: 'myPostJobs/viewApplications-job/:job_id',
        // element: <AdminRoute><ViewApplications_job></ViewApplications_job></AdminRoute>,
        // loader: ({params}) => fetch(`http://localhost:5000/job-applications/jobs/${params.job_id}`)
        element: (
          <ProtectedRoute allowedRoles={['admin', 'recruiter']}><ViewApplications_job></ViewApplications_job></ProtectedRoute>
        ),
        // loader: ({ params }) => fetch(`http://localhost:5000/job-applications/jobs/${params.job_id}`)
        loader: ({ params }) => fetch(`http://localhost:5000/job-applications/jobs/${params.job_id}`, { credentials: 'include' })


      },
      {
        path: 'approve',
        element: <AdminRoute><ApproveJobs></ApproveJobs></AdminRoute>
      },

      // recruiter
      {
        path: 'recruiterHome',
        element: <RecuiterHome></RecuiterHome>
      },
      //user
      {
        path: 'reviews',
        element: <Reviews></Reviews>
      },
      {
        path: 'reviewDetails',
        element: <ReviewDetails></ReviewDetails>,

      },
      {
        path: 'myReviewDetails',
        element: <MyReviewDetails></MyReviewDetails>,

      },
      {
        path: 'myReviewDetails/update_review/:id',
        element: <UpdateReviews></UpdateReviews>,
        loader: ({ params }) => fetch(`http://localhost:5000/reviews/${params.id}`)
      },
      {
        path: 'contact-messages',
        element: <AdminRoute><ContactSMS></ContactSMS></AdminRoute>
      }
    ]

  }

]);

export default Router;