import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';


const MyReviewDetails = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`https://job-box-portal-server.vercel.app/my-reviews?email=${user.email}`)
            console.log(res.data)
            return res.data;
        },
        enabled: !!user?.email,
    })

    const handleDeleteReview = review => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reviews/${review._id}`)
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your review has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }
    return (
        <div>
          
            <SectionTitle heading={`Total Reviews: ${reviews.length}`} subHeading="My Posted Review"></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Rating</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reviews.map((review, index) => <tr key={review._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={review.photoURL}
                                                    alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{review.name}</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{review.createdAt}</td>
                                <td>{review.rating}</td>
                                <td>
                                    {/* update jobs */}

                                    <Link to={`update_review/${review._id}`}>
                                        <button className="btn btn-ghost btn-sm bg-orange-500">
                                            <FaEdit className='text-white'></FaEdit></button>
                                    </Link>
                                </td>

                                <td>
                                    <button onClick={() => handleDeleteReview(review)} className="btn btn-ghost btn-xs text-red-600 text-2xl">
                                        <FaTrashAlt></FaTrashAlt></button>
                                </td>

                            </tr>)
                        }



                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default MyReviewDetails;