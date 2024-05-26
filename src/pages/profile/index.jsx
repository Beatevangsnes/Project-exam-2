import React from 'react';
import UserDetails from '../../components/user/UserDetails';
import '../../../src/App.css'


const Profile = () => {
  return (
    <div className='double-gradient min-h-screen flex flex-col justify-start pb-48'>
       <div className="container mx-auto p-4 lg:mt-12">
      <UserDetails />
    </div>
    </div>
  );
};

export default Profile;
