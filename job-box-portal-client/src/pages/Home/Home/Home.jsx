import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularJob from '../PopularJob/PopularJob';
import Reviews from '../Reviews/Reviews';
import TeamDeatils from '../TeamDetails/TeamDeatils';
import LatestJobs from '../LatestJobs/LatestJobs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <LatestJobs></LatestJobs>
            {/* <PopularJob></PopularJob> */}
            <TeamDeatils></TeamDeatils>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;