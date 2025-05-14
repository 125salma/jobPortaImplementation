import React from 'react';
import error from '../../assets/home/Error.jpg'
const UnAuthorized = () => {
    return (
        <div className='flex items-center justify-center'> 
           <img className='w-96 items-center ' src={error} alt="" />
        </div>
    );
};

export default UnAuthorized;