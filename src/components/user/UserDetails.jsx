import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, PencilSquareIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import EditProfileModal from './EditProfileModal';
import useFetchProfile from '../../api/hooks/useFetchProfile';
import MyBookings from './MyBookings';
import MyVenues from './MyVenues';

const UserDetails = () => {
  const username = localStorage.getItem('username');
  const { profileData, isLoading, error, fetchProfile } = useFetchProfile(username);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = async () => {
    await fetchProfile();
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white bg-opacity-20 shadow-md rounded-lg overflow-hidden backdrop-blur-md">
      <div className="bg-cover bg-center h-40" style={{ backgroundImage: `url(${profileData.banner?.url})` }}>
      </div>
      <div className="flex justify-center -mt-16">
        <img className="border-4 border-white rounded-lg h-32 w-32 bg-white" src={profileData.avatar?.url} alt={profileData.avatar?.alt} />
      </div>
      <div className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <h2 className="text-2xl font-semibold text-gray-900">{profileData.name}</h2>
          </div>
          <div className="flex items-center justify-center mb-4">
            <EnvelopeIcon className="h-6 w-6 text-gray-900 mr-2" />
            <p className="text-gray-900">{profileData.email}</p>
          </div>
          <div className="flex items-center justify-center mb-4">
          <ChatBubbleLeftIcon className="h-6 w-6 text-gray-900 mr-1 mb-4" />
          <p className="text-gray-900 mb-4">{profileData.bio}</p>
          </div>
          {profileData.venueManager ? (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-md text-sm font-semibold">Venue Manager</span>
          ) : (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-semibold">Customer</span>
          )}
        </div>
        <div className="mt-4 text-center pt-4">
          <button onClick={handleEditProfile} className="bg-indigo-500 bg-opacity-80 text-white px-3 py-1 rounded-md text-sm flex items-center justify-center mx-auto">
            <PencilSquareIcon className="h-4 w-4 text-white mr-1" />
            Edit Profile
          </button>
        </div>
      </div>
      <EditProfileModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        profileData={profileData} 
        onUpdate={handleProfileUpdate}
      />
      {profileData.venueManager && <MyVenues />}
      <MyBookings />
    </div>
  );
};

export default UserDetails;
