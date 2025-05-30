import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';


import facebook from '../../../assets/icon/facebook.png';
import twiter from '../../../assets/icon/twitter-bird.gif';
import contact from '../../../assets/icon/call.png';


import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

const TeamDeatils = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
   //jehetu shobai dekhbe tai public
     axiosPublic.get('/team/admins')
            .then(res => setAdmins(res.data))
    }, [])

    return (
        <section>
            <SectionTitle
                subHeading={"Any Time Service"}
                heading={`Our Team: ${admins.length}`}>
            </SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                breakpoints={{
                    0: {
                        slidesPerView: 1, // Small devices
                    },
                    768: {
                        slidesPerView: 2, // Medium devices
                    },
                    1024: {
                        slidesPerView: 4, // Large devices
                    },
                }}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                {admins.map((member, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg mt-6">
                         <Link to={`/profile/${member.email}`}>
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 mb-4"
                            />
                         </Link>
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                            <div className='flex'>
                                <img src={facebook} alt="" />
                                <img src={twiter} alt="" />
                                <Link to={`contact/${member._id}`}>
                                    <div className="tooltip" data-tip="Contact Us">
                                        <FaPhone className="text-2xl text-green-600 animate-pulse animate-pulse drop-shadow-lg" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* <SwiperSlide>
                    <img src={slide2} alt="" />
                    <h2 className='text-4xl text-center uppercase -mt-16 text-white'>Team2</h2>
                </SwiperSlide>

                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <h2 className='text-4xl text-center uppercase -mt-16 text-white'>Team3</h2>
                </SwiperSlide>

                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <h2 className='text-4xl text-center uppercase -mt-16 text-white'>Team4</h2>
                </SwiperSlide>

                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <h2 className='text-4xl text-center uppercase -mt-16 text-white'>Team5</h2>
                </SwiperSlide> */}

            </Swiper>
        </section>
    );
};

export default TeamDeatils;