import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Contact = () => {
        const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


  const handleContactSubmit = e => {

        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData.entries())
        //shob data ek sathe paoyar  jonno  fromEntries use kore
        const newContactlData = Object.fromEntries(formData.entries());
        console.log(newContactlData)


        axiosSecure.post('https://job-box-portal-server.vercel.app/contacts-message', newContactlData)
                .then(res =>{
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Message has been successfully send.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        //reset form
                        e.target.reset();
                        navigate('/')
                        
                    }
                })
 
  };


    return (
       <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Contact Us</h2>
      <form onSubmit={handleContactSubmit} className="space-y-4">
        
        <div>
          <label className="block text-gray-700"><strong>Name</strong></label>
          <input
            type="text"
            name="name"
            defaultValue={user.displayName}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-gray-700"><strong>Email</strong></label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-gray-700"><strong>Subject</strong></label>
          <input
            type="text"
            name="subject"

            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Subject of your message"
          />
        </div>

        <div>
          <label className="block text-gray-700"><strong>Message</strong></label>
          <textarea
            name="message"
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Your message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
    );
};

export default Contact;