import React from 'react';
;
import useAxiosPublic from '../../../hooks/useAxiosPublic';

import Swal from 'sweetalert2';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { RxRocket } from 'react-icons/rx';
import { FaRocket } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Reviews = () => {


  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()

  const handleAddReview = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const reviewData = Object.fromEntries(formData.entries());

    const { rating, ...newReview } = reviewData;

    newReview.rating = parseInt(rating)
    //console.log(newReview)
    axiosSecure.post('/reviews', newReview)
      .then(res => {
        //console.log(res.data)
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Review has been submitted.",
            showConfirmButton: false,
            timer: 1500
          });
          e.target.reset();

        }
      })
  }
  return (
    <div>
      <SectionTitle heading="GIVE A REVIEW..." subHeading="---Sharing is Caring!!!---"></SectionTitle>
      <div>
        <h2 className="text-xl font-bold mb-4">Job Portal Review</h2>
        <form onSubmit={handleAddReview} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Rating (1-5)</label>
            <select
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
            Send Review <FaRocket className='text-2xl' />

          </button>


        </form>
      </div>
    </div>
  );
};

export default Reviews;