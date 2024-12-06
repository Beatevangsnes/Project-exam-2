import React from 'react';
import RegisterForm from '../../components/forms/RegisterForm';
import '../../../src/App.css'

const Register = () => {
  return (
    <div className="double-gradient min-h-screen flex flex-col justify-start pb-48">
      <RegisterForm />
    </div>
  );
};

export default Register;
