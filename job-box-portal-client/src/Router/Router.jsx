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
import MyApplicaion from '../pages/MyApplication/MyApplicaion';
import AddJob from '../pages/AddJob/AddJob';
import MyPostedJobs from '../pages/MyPostedJobs/MyPostedJobs';
import ViewApplications from '../pages/ViewApplications/ViewApplications';
import AllJob from '../pages/AllJob/AllJob';



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
          element: <AllJob></AllJob>
        },
        {
            path: '/jobs/:id',
            element: <PrivateRoute><Job_Details></Job_Details></PrivateRoute>,
           loader: ({params}) => fetch(`http://localhost:5000/jobs/${params.id}`)

        },
        {
          path: '/jobApply/:id',
          element: <PrivateRoute><JobApply></JobApply></PrivateRoute>
        },
        {
          path: '/myApplications',
          element: <PrivateRoute><MyApplicaion></MyApplicaion></PrivateRoute>
        },
        {
          path: '/myPostedJobs',
          element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
        },
        {
          path: '/viewApplications/:job_id',
          element: <PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/job-applications/jobs/${params.job_id}`)

        },
        {
          path: '/addJob',
          element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
        },
        {
          path: '/login',
          element:<Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        }
      ]
    },
    
  ]);

export default Router;