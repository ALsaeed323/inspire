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
  const { login } = useAuth();
  const navigate = useNavigate();

  function signInHandler(userData) {
    fetch('https://react-5053d-default-rtdb.firebaseio.com/users.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch users');
        }
      })
      .then(data => {
        const users = data || {};
        const user = Object.values(users).find(
          u => u.email === userData.email && u.password === userData.password
        );

        if (user) {
          setSuccessMessage('User signed in successfully!');
          login(user); // Set fetched user data in context

          if (user.role === 'user') {
            navigate('/profile');
          } else if (user.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/signup');
          }
        } else {
          throw new Error('Invalid email or password');
        }
      })
      .catch(error => {
        console.error('Error signing in:', error);
        // Handle error state or display an error message to the user
      });
  }

  return (
    <div className="signup-container">
      <Logo />
      <div className="signup-left">
        <h1>Sign In</h1>
        <p>Enter your credentials to continue</p>
        <SigninForm onSignIn={signInHandler} />
        {successMessage && <p>{successMessage}</p>}
      </div>
      <div className="signup-right">
        <Illustration />
      </div>
    </div>
  );
}

export default Signin;
