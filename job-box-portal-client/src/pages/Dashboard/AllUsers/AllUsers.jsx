import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    // //make admin
    // const handleMakeAdmin = user => {
    //     axiosSecure.patch(`/users/role/${user._id}`, { role: 'admin' })
    //         .then(res => {
    //             console.log(res.data);
    //             if (res.data.modifiedCount > 0) {
    //                 refetch();
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: `${user.name} is an Admin Now`,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         })

    // }
    //make recruiter
    const handleRoleChange = user => {
        console.log(user)
        const newRole =
            user.role === 'user' ? 'admin'
                : user.role === 'admin' ? 'recruiter'
                    : 'user';
        axiosSecure.patch(`/users/role/${user._id}`, { newRole })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now ${newRole}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

    //delete user
    const handleDeleteUser = user => {
        console.log(user)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount > 0) {
                            //use refetch() tantack tahole data auometic load hobe
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });

                        }
                    })

            }
        })
    }

    return (
        <div>
            <div>
                <div className='flex justify-evenly my-4'>
                    <h2 className="text-3xl">All Users</h2>
                    <h2 className="text-3xl">Total Users: {users.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th></th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    {/* <td>
                                    {user.role === 'admin' ? 'Admin' :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-lg bg-orange-500">
                                            <FaUsers className='text-white'></FaUsers></button>}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className='text-red-600'></FaTrashAlt></button>
                                </td> */}


                                    {/* <td>
                                        {user.role === 'admin' ? (
                                            'Admin'
                                        ) : user.role === 'recruiter' ? (
                                            'Recruiter'
                                        ) : (
                                            <>
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-orange-500 mr-2 text-white">
                                                    Make Admin
                                                </button>
                                                <button onClick={() => handleMakeRecruiter(user)} className="btn btn-sm bg-blue-500 text-white">
                                                   Make Recruiter
                                                </button>
                                            </>
                                         )}
                                    </td> */}


<td>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-500 rounded-full">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleRoleChange(user)}
                                            className="btn btn-xs bg-blue-500 hover:bg-orange-500 text-white"
                                        >
                                            Change Role
                                        </button>
                                    </td>

                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className='text-red-600'></FaTrashAlt>
                                        </button>
                                    </td>


                                   

                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;