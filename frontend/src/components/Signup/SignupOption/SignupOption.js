import React from 'react';
import './SignupOption.css';


function SignupOption() {
  return (
    <div className="signup-option">
      <button className="signup-button microsoft">
        <img width="24" src={`${process.env.PUBLIC_URL}/office.svg`} alt="Microsoft 365" />
        Sign up with Microsoft 365
      </button>
      <div className="or-divider">
        <span>OR</span>
      </div>
    </div>
  );
}

export default SignupOption;
