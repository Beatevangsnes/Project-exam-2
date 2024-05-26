import React from 'react';
import LoginForm from '../../components/forms/LoginForm';
import '../../../src/App.css'

const Login = () => {
  return (
    <div className="double-gradient min-h-screen flex flex-col justify-start pb-48">
      <div>
      <h1 className="text-4xl font-thin tracking-light mt-20 lg:text-6xl">Holidaze</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;