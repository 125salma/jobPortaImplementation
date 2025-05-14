import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import registerLottieData from '../../assets/lottie/register.json'
import { Helmet } from 'react-helmet-async';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../shared/SocialLogin/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {

    const axiosPublic = useAxiosPublic();


    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    // const handleRegister = e => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const name = form.name.value;
    //     const photo = form.photoURL.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     console.log(email, password, name, photo);

    //     //ToDo:
    //     // password validation: 
    //     // show password validation error
    //     createUser(email, password)
    //         .then(result => {
    //             console.log(result.user)
    //         })
    //         .catch(error => {
    //             console.log(error.message)
    //         })

    // }

    const onSubmit = (data) => {
        //console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                //const loggedUser = result.user
                //console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // Create user entry in the database
                        const userInf = {
                            name: data.name,
                            // photoURL: data.photoURL,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInf)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })


                    })
            })
            .catch(errors => {
                console.log(errors)
            })

    }


    return (
        <>
            <Helmet>
                <title>Job Portal | Register</title>
            </Helmet>

            {/* <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={registerLottieData}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name='photoURL' placeholder="Photo URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary w-full">Register</button>
                            </div>
                        </form>
                        <p className='text-center'><small>Already have an account <Link to="/login" className='text-primary'>Login</Link></small></p>

                        <SocialLogin></SocialLogin>
                       
                    </div>
                </div>
            </div> */}


            <div className="hero bg-base-200  my-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register Now!</h1>
                        <Lottie animationData={registerLottieData}></Lottie>

                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Name</label>
                                <input type="text" {...register("name", { required: true })} name='name' className="input" placeholder="Name" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}

                                <label className="fieldset-label">Photo URL</label>
                                <input type="text" {...register("photoURL", { required: true })} className="input" placeholder="Photo URL" />
                                {errors.photoURL && <span className='text-red-600'>Photo URL is required</span>}

                                <label className="fieldset-label">Email</label>
                                <input type="email" {...register("email", { required: true })} name='email' className="input" placeholder="Email" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}

                                <label className="fieldset-label">Password</label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                                })} name='password' className="input" placeholder="Password" />
                                {errors.password?.type === "required" && (
                                    <p className='text-red-600'>Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className='text-red-600'>Password must be 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className='text-red-600'>Password must be less than 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className='text-red-600'>Password must have one Uppercase one lower case, one number and one spatical character</p>
                                )}

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <input type="submit" className="btn btn-neutral mt-4" value="Register" />

                            </fieldset>
                        </form>
                        <p className='text-center'><small>Already have an account <Link to="/login" className='text-primary'>Login</Link></small></p>
                        <SocialLogin></SocialLogin>

                    </div>
                </div>
            </div>
        </>

    );
};

export default Register;