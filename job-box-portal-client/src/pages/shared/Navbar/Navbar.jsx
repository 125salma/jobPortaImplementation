import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext/AuthContext';
import logo from '../../../assets/job-logo.png'

import useRoleHandleSystem from '../../../hooks/useRoleHandleSystem';




const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const { roleInfo } = useRoleHandleSystem();

    const navigate = useNavigate()
    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/jobs">All Job</NavLink></li>
        {/* <>
            {
                user && <li><NavLink to="/allReviews">All Reviews</NavLink></li>

            }
            {
                user && roleInfo.isAdmin && <li><NavLink to="/dashboard/adminHome">Dashboard</NavLink></li>
            }
            {
                user && roleInfo.isRecruiter && <li><NavLink to="/dashboard/recruiterHome">Dashboard</NavLink></li>
            }
            {
                user && !roleInfo.isAdmin && <li><NavLink to="/dashboard/userHome">Dashboard</NavLink></li>
            }
        </> */}
        <>
  {user && <li><NavLink to="/allReviews">All Reviews</NavLink></li>}

  {user && roleInfo?.isAdmin && (
    <li><NavLink to="/dashboard/adminHome">Dashboard</NavLink></li>
  )}

  {user && !roleInfo?.isAdmin && roleInfo?.isRecruiter && (
    <li><NavLink to="/dashboard/recruiterHome">Dashboard</NavLink></li>
  )}

  {user && !roleInfo?.isAdmin && !roleInfo?.isRecruiter && (
    <li><NavLink to="/dashboard/userHome">Dashboard</NavLink></li>
  )}
</>


    </>


    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('successful sign out')
                navigate('/login')
            })
            .catch(error => {
                console.log('failed to sign out .stay here. dont leave me alone')
            })
    }

    return (

        <div className="navbar bg-base-100 fixed z-10 top-0 bg-opacity-30 bg-black text-white max-w-screen-xl shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="text-black menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navOptions}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <img className='w-12' src={logo} alt="" />
                    <h3 className="text-3xl">JobFinder</h3>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <span className='text-primary pr-2'>{user?.displayName}</span>

                        <div className="avatar placeholder pr-2">
                            <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                <span className="text-xs">

                                    <Link to={`/profile/${user.email}`}><img src={user?.photoURL} alt="" /></Link>
                                </span>
                            </div>
                        </div>

                        <button onClick={handleSignOut} className="btn">Log Out</button>
                    </> :
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">
                                <button className="btn">Login</button>
                            </Link>
                        </>
                }

            </div>
        </div>
    );
};

export default Navbar;