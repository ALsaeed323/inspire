// src/components/Signin/Signin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SigninForm from './SigninForm/SigninForm';
import Illustration from '../Illustration/Illustration';
import Logo from '../Logo';
import '../Signup/Signup.css';
import '../Signup/SignupForm/SignupForm.css';

function Signin() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const signInHandler = async (userData) => {
    try {
      const response = await login(userData);
      setSuccessMessage('Login successful');
      setErrorMessage('');

      // Navigate to the URL provided by the backend
      navigate(response.redirectUrl);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <Logo />
      <div className="signup-left">
        <h1>Sign In</h1>
        <p>Enter your credentials to continue</p>
        <SigninForm onSignIn={signInHandler} />
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="signup-right">
        <Illustration />
      </div>
    </div>
  );
}

export default Signin;
