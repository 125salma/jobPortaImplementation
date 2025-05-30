import Lottie from 'lottie-react';
import loginLottieJSON from '../../assets/lottie/login.json'
import { Helmet } from 'react-helmet-async';
import { useContext, useRef, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../shared/SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import auth from '../../firebase/firebase.config';


import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const { singInUser, signOutUser } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    console.log('log ni page', location)
    const from = location.state || ' / ';
    const emailRef = useRef();

    console.log('state in the location', location.state)

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        //console.log(email, password);


        setLoginError('')



        singInUser(email, password)
            .then(result => {
                console.log('sign in', result.user.email);

                // //verify email
                // if (!result.user.emailVerified) {
                //     setLoginError('Please verify your email address');
                //     signOutUser()
                //     return; // jeno nicher ongsho na chole
                // }


                const user = { email: result.user.email };

                console.log(user)

                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })

                    .then(res => {
                        console.log(res.data)
                        if (res.data.success) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User login Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }

                    })
                //ToDo

            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message)
            })

    }


    //password forget send mail
    const handleForgetPassword = () => {
        console.log('get me email address', emailRef.current.value);
        const email = emailRef.current.value;
        if (!email) {
          alert('Please Provide a Valid email address')
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(()=>{

                alert('Password Reset Email sent, please check your email')
            })
            
        }
    }
    return (
        <>
            <Helmet>
                <title>Job Portal | Login</title>
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={loginLottieJSON}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="ml-8 mt-4 text-5xl font-bold">Login now!</h1>
                        <form onSubmit={handleSignIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" ref={emailRef} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label onClick={handleForgetPassword} className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <p className='text-red-400'>{loginError}</p>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary w-full">Login</button>
                            </div>
                        </form>
                        <p className='text-center'><small>New Here? Create an account <Link to='/register' className='text-primary'>Register</Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;