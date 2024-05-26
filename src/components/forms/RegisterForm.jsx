import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth/register';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    avatar: { url: '' },
    banner: { url: '' },
    venueManager: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (name === 'venueManager') {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bio: formData.bio,
      venueManager: formData.venueManager,
    };

    if (formData.avatar.url) {
      dataToSend.avatar = formData.avatar;
    }

    if (formData.banner.url) {
      dataToSend.banner = formData.banner;
    }

    try {
      const response = await registerUser(dataToSend);
      console.log('User registered:', response);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='container mx-auto flex h-full flex-1 lg:mt-20 justify-center'>
      <div className='w-[450px] max-w-lg'>
        <div className='leading-loose'>
          <form onSubmit={handleSubmit} className='m-4 rounded-xl bg-white bg-opacity-20 p-10 shadow-xl backdrop-blur-sm'>
            <p className='text-center text-[20px] font-regular text-gray-900 pb-4'>Register</p>
            <div>
              <label htmlFor="register-name" className='block text-md font-thin text-gray-900'>Username</label>
              <input
                className='w-full rounded bg-gray-100 px-5 py-1 text-gray-700 focus:bg-white focus:outline-none mt-1'
                id="register-name"
                name="name"
                placeholder='Enter your username'
                type="text"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="register-email" className='block text-md font-thin text-gray-900 pt-2'>Email address</label>
              <input
                className='w-full rounded bg-gray-100 px-5 py-1 text-gray-700 focus:bg-white focus:outline-none mt-1'
                id="register-email"
                name="email"
                placeholder='Example@stud.noroff.no'
                type="email"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="register-password" className='block text-md font-thin text-gray-900 pt-2'>Password</label>
              <input
                className='w-full rounded bg-gray-100 px-5 py-1 text-gray-700 focus:bg-white focus:outline-none mt-1'
                id="register-password"
                name="password"
                placeholder='Enter your password'
                type="password"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="register-bio" className='block text-md font-thin text-gray-900 pt-2'>Bio</label>
              <textarea
                className='w-full rounded bg-gray-100 px-5 py-1 text-gray-700 focus:bg-white focus:outline-none mt-1'
                id="register-bio"
                name="bio"
                placeholder='Enter your bio'
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="register-avatar-url" className='block text-md font-thin text-gray-900 pt-2'>Avatar</label>
              <input
                className='w-full rounded bg-gray-100 px-5 py-1 text-gray-700 focus:bg-white focus:outline-none mt-1'
                id="register-avatar-url"
                name="avatar.url"
                placeholder='Enter your avatar URL'
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="register-banner-url" className='block text-md font-thin text-gray-900 pt-2'>Banner</label>
              <input
                className='w-full rounded bg-gray-100 px-5 py-1 text-gray-700 focus:bg-white focus:outline-none mt-1'
                id="register-banner-url"
                name="banner.url"
                placeholder='Enter your banner URL'
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="register-venueManager" className='block text-md font-thin text-gray-900 pt-2'>Venue Manager</label>
              <input
                id="register-venueManager"
                name="venueManager"
                type="checkbox"
                onChange={handleChange}
              />
            </div>
            <div className='mt-6 text-center'>
              <button type="submit" className='rounded bg-indigo-600 px-4 py-1 font-medium tracking-wide text-white transition-all duration-300 hover:bg-indigo-300'>Register</button>
            </div>
            <div className='grid text-container'>
              <span className='text-md font-regular text-gray-900 pt-4 text-center'>OR</span>
              <a href='/login' className='text-center right-0 inline align-baseline text-sm font-medium text-indigo-500 hover:text-white pt-4'>Already have an account?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
