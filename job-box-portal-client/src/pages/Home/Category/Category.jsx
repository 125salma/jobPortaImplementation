import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';

import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import axios from 'axios';
import { FaQuoteLeft } from 'react-icons/fa';
const Category = () => {
    const [jobsCategory, setJobsCategory] = useState([])
    useEffect(() => {
        axios.get('jobs-category.json')
            .then(res => {
                setJobsCategory(res.data)
            })
    }, [])
    return (
   
        <>
        <SectionTitle
                    subHeading={"Job Category"}
                    heading={"Category"}>
              </SectionTitle>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
            >
        <div className=''>
                    
        {
                    jobsCategory.map(category => <SwiperSlide  className='border' key={category._id}>
                        <div className='flex flex-col items-center mx-24 my-16'>

                            <img className='w-20' src={category.logo_url} alt="" />
                            <p className=''>{category.category}</p>
                            <p className=' text-orange-400'>Jobs Available: {category.available_positions}</p>
                        </div>
                    </SwiperSlide>)
                }
        </div>

                {/* <SwiperSlide>Slide 1</SwiperSlide> */}

            </Swiper>
        </>
    );
};

export default Category;