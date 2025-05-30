import React from 'react';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
    const { user } = useAuth();
    return (
        <div className='text-3xl'>
            <h2>
                <span className='text-primary'>Hi Welcome, </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>

      
        </div>
    );
};

export default UserHome;