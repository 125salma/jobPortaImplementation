import React from 'react';
import useAuth from '../../../hooks/useAuth';

const RecuiterHome = () => {
    const {user} = useAuth();
    return (
        <div className='text-3xl'>
            <h2>
                <span>Hi Welcome, </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        </div>
    );
};

export default RecuiterHome;