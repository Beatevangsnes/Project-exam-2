import React from 'react';
import LoginForm from '../../components/forms/LoginForm';
import '../../../src/App.css'

const Login = () => {
  return (
    <div className="double-gradient min-h-screen flex flex-col justify-start pb-48">
      <LoginForm />
    </div>
  );
};

export default Login;
