import React, { useState } from 'react';
import SignupOption from './SignupOption/SignupOption';
import SignupForm from './SignupForm/SignUpForm';
import Illustration from '../Illustration/Illustration';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import './Signup.css';
import userService from '../../services/userService';

function Signup() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addUserHandler = async (userData) => {
    try {
      const response = await userService.signup(userData);
      setSuccessMessage(response.message);
      setErrorMessage('');
      navigate('/signin'); // Redirect to login page or another page on success
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='signup-container'>
      <Logo />
      <div className="signup-left">
        <h1>Sign Up</h1>
        <p>Enter your credentials to continue</p>
        <SignupOption />
        <SignupForm onAddUser={addUserHandler} />
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="signup-right">
        <Illustration />
      </div>
    </div>
  );
}

export default Signup;
