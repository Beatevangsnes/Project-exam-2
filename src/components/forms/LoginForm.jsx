import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth/login';
import AuthContext from '../../api/context/AuthContext';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const data = await loginUser({ email, password });
      login(data.data);
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("userEmail", data.data.email);
      localStorage.setItem("username", data.data.name);
      navigate("/profile");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className='container mx-auto flex h-full flex-1 lg:mt-20 justify-center'>
      <div className='w-[450px] max-w-lg'>
        <div className='leading-loose'>
          <form onSubmit={handleSubmit} className='m-4 rounded-xl p-10 shadow-xl bg-white bg-opacity-20 backdrop-blur-sm'>
            <p className='text-center text-[20px] font-regular text-gray-900 pb-4'>Login</p>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label htmlFor="login-email" className='block text-md font-thin text-gray-900'>Email address</label>
              <input
                className='w-full rounded bg-gray-100 px-5 py-1 text-gray-700 focus:bg-white focus:outline-none mt-1'
                id="login-email"
                name="email"
                placeholder='Example@stud.noroff.no'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="login-password" className='block text-md font-thin text-gray-900 pt-2'>Password</label>
              <input
                className='w-full rounded bg-gray-100 px-5 py-1 text-gray-700 focus:bg-white focus:outline-none mt-1'
                id="login-password"
                name="password"
                placeholder='Enter your password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='mt-6 text-center'>
              <button type="submit" className='rounded bg-indigo-500 px-4 py-1 font-medium tracking-wide text-white transition-all duration-300 hover:bg-indigo-300'>Login</button>
            </div>
            <div className='grid text-container'>
              <span className='text-md font-regu lar text-gray-900 pt-4 text-center'>OR</span>
              <Link to='/register' className='text-center right-0 inline align-baseline text-sm font-medium text-indigo-500 hover:text-white pt-4'>
                Don't have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
