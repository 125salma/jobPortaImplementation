import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

const ContactSMS = () => {
    // const [messages, setMessages] = useState([]);
    const axiosSecure = useAxiosSecure()

    // useEffect(() => {
    //     axiosSecure.get('contacts-message') // Backend e ekta GET API banate hobe
    //         .then(res => setMessages(res.data))
    //         .catch(err => console.error(err));
    // }, []);
    const { data: messages = [], isLoading, error, refetch } = useQuery({
        queryKey: ['contacts-message'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contacts-message');
            return res.data;
        }
    });


    const handleDelete = msg => {
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
                const res = await axiosSecure.delete(`/contacts-message/${msg._id}`)
                //console.log(res.data)
                if (res.data.deletedCount > 0) {
                    //refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${msg.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        });
    }


    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Something went wrong!</p>;
    }

    return (
        <div>

            {/* <div className="p-4">
                <h2 className="text-3xl font-bold mb-4">Contact Messages: {messages.length} </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {messages.map(msg => (
                        <div key={msg._id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                            <small>
                                <p>Posted: {moment(new Date(msg.createdAt)).fromNow()}</p>
                            </small>
                            <h3 className="text-xl font-semibold mb-2">{msg.name}</h3>
                            <p><span className="font-medium">Email:</span> {msg.email}</p>

                            <p className="mt-2">{msg.message}</p>
                            <button
                                onClick={() => handleDelete(msg)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="p-6 space-y-4">
                <h2 className="text-3xl font-bold mb-4">Contact Messages: {messages.length} </h2>

                <div className='space-y-4'>
                    {messages.map(msg => (
                        <details key={msg._id} className="border rounded-md shadow p-4">
                            <summary className="cursor-pointer font-semibold text-blue-600">{msg.subject}</summary>
                            <div className="mt-2">
                                <small>
                                    <p>Posted: {moment(new Date(msg.createdAt)).fromNow()}</p>
                                </small>
                                <p><strong>Name:</strong> {msg.name}</p>
                                <p><strong>Email:</strong> {msg.email}</p>
                                <p><strong>Message:</strong> {msg.message}</p>
                                <p className="text-sm text-gray-500 mt-1">Time: {new Date(msg.createdAt).toLocaleString()}</p>

                                <button
                                    onClick={() => handleDelete(msg)}
                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactSMS;