import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from 'react-icons/fa';

const Instruction = () => {
    const [instructions, setInstructions] = useState([]);
    useEffect(() => {
        fetch('instructions.json')
            .then(res => res.json())
            .then(data => setInstructions(data))
    }, [])
    // console.log(instructions)
    return (
        <section>
            <SectionTitle
                subHeading="Website Instrutions"
                heading="Instructions"
            ></SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    instructions.map(instruction => <SwiperSlide key={instruction.id}>
                        <div className='flex flex-col items-center mx-24 my-16 space-y-3'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={instruction.rating}
                                readOnly
                            />
                            <FaQuoteLeft className='text-6xl' />
                            <h3 className='text-2xl text-orange-400'>{instruction.title}</h3>

                            <div>
                                {
                                    instruction.steps.map((step, index) => <li className='text-center'  key={index}>{step}</li>)
                                }

                            </div>

                         
                        </div>
                    </SwiperSlide>)
                }


            </Swiper>
        </section>

    );
};

export default Instruction;