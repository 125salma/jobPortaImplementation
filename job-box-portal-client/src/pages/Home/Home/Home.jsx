import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularJob from '../PopularJob/PopularJob';
import Reviews from '../Reviews/Reviews';
import TeamDeatils from '../TeamDetails/TeamDeatils';
import LatestJobs from '../LatestJobs/LatestJobs';
import Instruction from '../Instruction/Instruction';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>JobFinder</title>
            </Helmet>

            <Banner></Banner>
            <Category></Category>
            <LatestJobs></LatestJobs>
            {/* <PopularJob></PopularJob> */}
            <TeamDeatils></TeamDeatils>
            {/* <Reviews></Reviews> */}
            <Instruction></Instruction>
        </div>
    );
};

export default Home;