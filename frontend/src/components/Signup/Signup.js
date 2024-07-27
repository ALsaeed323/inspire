import React, { useState } from 'react';
import SignupOption from './SignupOption/SignupOption';
import SignupForm from './SignupForm/SignUpForm';
import Illustration from '../Illustration/Illustration';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import './Signup.css';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addUserHandler = async (userData) => {
    try {
      console.log(userData);
      const response = await axios.post('http://localhost:4000/signup', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      navigate('/signin'); // Redirect to login page or another page on success
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response.data.message || 'An error occurred');
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
