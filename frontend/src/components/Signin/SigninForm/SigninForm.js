import React, { useState } from "react";

function SigninForm({ onSignIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function submitHandler(event) {
    event.preventDefault();
    const { email, password } = formData;

    const userData = {
      email,
      password,
    };

    // Call the prop function to handle sign-in
    onSignIn(userData);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="password-group">
        <label style={{ padding: '10px', fontFamily: "'Arial', sans-serif" }}>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="password-group">
      <label style={{ padding: '10px', fontFamily: "'Arial', sans-serif" }}>Password:</label>

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button  type="submit" className="signin-btn">
        Sign In
      </button>
    </form>
  );
}

export default SigninForm;
