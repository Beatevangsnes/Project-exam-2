import React, { useState } from 'react';
import { Dialog, Switch } from '@headlessui/react';
import { IoClose } from "react-icons/io5";
import { updateProfile } from '../../api/auth/profile';
import { createApiKey } from '../../api/auth/apiKey';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const EditProfileModal = ({ isOpen, onClose, profileData, onUpdate }) => {
  const [formData, setFormData] = useState({
    bio: profileData.bio,
    avatarUrl: profileData.avatar?.url,
    bannerUrl: profileData.banner?.url,
    venueManager: profileData.venueManager,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, venueManager: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;

      const updatedProfile = await updateProfile(profileData.name, {
        bio: formData.bio,
        avatar: { url: formData.avatarUrl },
        banner: { url: formData.bannerUrl },
        venueManager: formData.venueManager,
      }, apiKey);

      onUpdate(updatedProfile.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-6 mx-4 max-w-lg z-20 relative">
          <button className="absolute top-3 right-3" onClick={onClose}>
            <IoClose size={24} />
          </button>
          <div className="mt-4">
            <h1 className="text-center text-xl font-medium">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                <input
                  type="text"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Banner URL</label>
                <input
                  type="text"
                  name="bannerUrl"
                  value={formData.bannerUrl}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center mt-4">
                <label className="block text-sm font-medium text-gray-700 mr-4">Venue Manager</label>
                <Switch
                  checked={formData.venueManager}
                  onChange={handleSwitchChange}
                  className={classNames(
                    formData.venueManager ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span className="sr-only">Venue Manager</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      formData.venueManager ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
              <div className="text-right">
                <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded-md">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfileModal;
