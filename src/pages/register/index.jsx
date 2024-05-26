import React from 'react';
import RegisterForm from '../../components/forms/RegisterForm';
import '../../../src/App.css'

const Register = () => {
  return (
    <div className="double-gradient min-h-screen flex flex-col justify-start pb-48">
      <div>
      <h1 className="text-4xl font-thin tracking-light mt-20 lg:text-6xl">Holidaze</h1>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
