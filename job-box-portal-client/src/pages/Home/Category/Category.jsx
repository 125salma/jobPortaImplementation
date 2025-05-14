import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';

import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import axios from 'axios';
import { FaQuoteLeft } from 'react-icons/fa';
import CategoryListJobs from '../CategoryListJobs/CategoryListJobs';
const Category = () => {
    const [jobsCategory, setJobsCategory] = useState([]);
    const [dataLengthJobs, setDataLengthJobs] = useState(4);

    useEffect(() => {
        axios.get('jobs-category.json')
            .then(res => {
                setJobsCategory(res.data)
            })
    }, [])
    return (

        <>
            {/* <SectionTitle
                subHeading={"Job Category"}
                heading={"Category"}>
            </SectionTitle> */}
            {/* <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
            > */}
            {/* <div className=''>
                    
        {
                    jobsCategory.map(category => <SwiperSlide  className='border' key={category._id}>
                        <div className='flex flex-col items-center mx-24 my-16'>

                            <img className='w-20' src={category.logo_url} alt="" />
                            <p className=''>{category.category}</p>
                            <p className=' text-orange-400'>Jobs Available: {category.available_positions}</p>
                        </div>
                    </SwiperSlide>)
                }
        </div> */}

            {/* <SwiperSlide>Slide 1</SwiperSlide> */}

            {/* </Swiper> */}
            <h2 className="text-5xl text-center font-bold mt-14 text-violet-600">Job Catagory List</h2>
            <p className="text-center mt-4 mb-12 text-[#757575]">Explore thousands of job opportunities with all the information you need. Its your future</p>

            <div className="grid md:grid-cols-4 gap-6">
                {
                    jobsCategory.slice(0, dataLengthJobs).map(categoryList => <CategoryListJobs
                        key={categoryList.id}
                        categoryList={categoryList}>
                    </CategoryListJobs>

                    )
                }
            </div>

            {/* <div className="grid justify-items-center mt-4">
                <div className={dataLengthJobs === jobsCategory.length ? 'hidden' : ''}>
                    <button onClick={() => setDataLengthJobs(jobsCategory.length)} 
                    className="btn btn-primary bg-gradient-to-r from-indigo-400">Show all job Category</button>

                </div>
            </div> */}
            <div className="grid justify-items-center mt-4">
                <button
                    onClick={() =>
                        setDataLengthJobs(
                            dataLengthJobs === jobsCategory.length ? 4 : jobsCategory.length
                        )
                    }
                    className="btn btn-primary bg-gradient-to-r from-indigo-400"
                >
                    {dataLengthJobs === jobsCategory.length ? 'Show Less...' : 'Show All Job Categories...'}
                </button>
            </div>



        </>
    );
};

export default Category;