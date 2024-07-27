import React, { useState } from 'react';
import SignupOption from './SignupOption/SignupOption';
import SignupForm from './SignupForm/SignUpForm';
import Illustration from '../Illustration/Illustration';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  function addUserHandler(userData) {
    fetch('https://react-5053d-default-rtdb.firebaseio.com/users.json', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        setSuccessMessage('User Added Successfully');
        console.log(response);
        navigate('/', { replace: true }); // Navigate to home page after successful addition
      } else {
        throw new Error('Failed to add user');
      }
    }).catch(error => {
      console.error(error);
      // Handle error state or display an error message to the user
    });
  }

  return (
    <div className='signup-container'>
      <Logo />
      <div className="signup-left">
        <h1>Sign Up</h1>
        <p>Enter your credentials to continue</p>
        <SignupOption />
        <SignupForm onAddUser={addUserHandler} />
        {successMessage && <p>{successMessage}</p>}
      </div>
      <div className="signup-right">
        <Illustration />
      </div>
    </div>
  );
}

export default Signup;
