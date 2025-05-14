import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Link, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { Rating } from '@smastrom/react-rating';
import moment from 'moment';
import useAuth from '../../../hooks/useAuth';
import { FaClock } from 'react-icons/fa';
import { FcAlarmClock } from 'react-icons/fc';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const ReviewDetails = () => {
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth()

  useEffect(() => {
    axiosSecure.get('/reviews')
      .then(res => {
        setReviews(res.data);
        //console.log(res.data)
      })

  }, []);


  return (
    <div className="p-6 my-12">
    
        <SectionTitle heading="All User Reviews" subHeading="What Our Client Review"></SectionTitle>
      <div className="grid gap-4 ">
        {reviews.map((review) => (
          <div key={review._id} className="border p-4 rounded shadow ">

            <div className="avatar placeholder pr-2 ">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xs">
                  <img src={review.photoURL} alt="" />
                </span>
              </div>

              <p className='ml-2'><strong>{review.name}</strong></p>
            </div>

            <small>
              <p className='flex items-center ml-8'><FcAlarmClock></FcAlarmClock>: {moment(new Date(review.createdAt)).fromNow()}</p>
            </small>

            <p className='pb-2'>
              {/* <strong>Rating:</strong> {review.rating} */}
            </p>
            <Rating className='pb-2'
              style={{ maxWidth: 180 }}
              value={review.rating}
              readOnly
            />
            {/* <p><strong>Recommendation:</strong> {review.recomended}</p> */}

            <span className={`pb-2 px-2 py-1  text-white rounded ${review.recomended === 'yes' ? 'bg-green-500' : 'bg-red-500'}`}>
              {review.recomended === 'yes' ? 'Recommended' : 'Not Recommended'}
            </span>

            <p className="pt-2"><strong>Review: </strong> {review.description}</p>
            
          </div>
        ))}
      </div>
    </div>



  );
};

export default ReviewDetails;