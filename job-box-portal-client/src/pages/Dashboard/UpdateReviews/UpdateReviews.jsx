import React, { useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateReviews = () => {
    const review = useLoaderData();
    console.log(review)
    const {_id,description,recomended,rating} = review;
     const axiosSecure = useAxiosSecure()



  const handleUpdateReview = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const reviewData = Object.fromEntries(formData.entries());

    const { rating, ...newReview } = reviewData;

    newReview.rating = parseInt(rating)
    console.log(newReview)
    axiosSecure.patch(`/reviews/${_id}`, newReview)
      .then(res => {
        console.log(res.data)
      
                  if (res.data.modifiedCount > 0) {
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: `updated to the review`,
                          showConfirmButton: false,
                          timer: 1500
                      });
                  

        }
      })
  }
    return (
          <div>
      <SectionTitle heading="update review..." subHeading="---Sharing is Caring!!!---"></SectionTitle>
      <div>
        <h2 className="text-xl font-bold mb-4">Job Portal Review</h2>
        <form onSubmit={handleUpdateReview} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Rating (1-5)</label>
            <select
            defaultValue={rating}
              name='rating'
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">-- Select a Rating --</option>
              {[1, 2, 3, 4.3, 4.5, 5, 5.5,].map((num) => (
                <option key={num} value={num}>{num}*</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Your Experience</label>
            <textarea
            defaultValue={description}
              name='description'
              className="w-full border rounded-md p-2"
              rows={4}
              placeholder="Describe your experience using the job portal..."
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Would you recommend this portal?</label>
            <select
            defaultValue={recomended}
              name='recomended'
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">-- Select an Option --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex justify-center items-center"
          >
            Update Review <FaRocket className='text-2xl' />

          </button>


        </form>
      </div>
    </div>
    );
};

export default UpdateReviews;