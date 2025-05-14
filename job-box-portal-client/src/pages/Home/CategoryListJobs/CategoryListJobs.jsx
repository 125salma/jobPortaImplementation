import React from 'react';

const CategoryListJobs = ({ categoryList }) => {
    const { logo_url, category,job_title, availability } = categoryList
    
    return (
        <div>

            <div className="shadow p-4 text-center">
                <img className='w-28 mx-auto' src={categoryList.logo_url} alt="" />
                <div className="pt-6">
                    <h2 className="font-bold">{categoryList.category}</h2>
                    <p>{categoryList.availability}</p>
                </div>

            </div>
        </div>
    );
};

export default CategoryListJobs;