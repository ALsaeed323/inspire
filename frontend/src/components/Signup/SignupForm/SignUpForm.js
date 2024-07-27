import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./SignupForm.css";

function SignupForm(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [termsChecked, setTermsChecked] = useState(false);

  const onSubmit = (data) => {
    if (!termsChecked) {
      alert("Please agree to terms and conditions.");
      return;
    }
    // Add the role as 'user' by default
    const userData = { ...data, role: 'user' };
    props.onAddUser(userData);
  };

  const password = watch("password");

  const passwordStrength = password ? (
    password.length < 6
      ? "Weak"
      : password.length >= 6 && password.length < 10
      ? "Moderate"
      : "Strong"
  ) : "";

  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName", { required: "First Name is required" })}
        />
        {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: "Last Name is required" })}
        />
        {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
      </div>
      <input
        type="email"
        placeholder="Email Address"
        {...register("email", {
          required: "Email Address is required",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Enter a valid email address"
          }
        })}
      />
      {errors.email && <p className="error-message">{errors.email.message}</p>}
      <div className="password-group">
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <div className="password-strength" style={{ marginRight: "340px" }}>
          <div
            style={{
              width: "100%",
              height: "5px",
              backgroundColor:
                passwordStrength === "Weak"
                  ? "red"
                  : passwordStrength === "Moderate"
                  ? "orange"
                  : passwordStrength === "Strong"
                  ? "green"
                  : "white",
              marginTop: "50px",
              marginRight: "50px",
            }}
          ></div>
          <span>{passwordStrength}</span>
        </div>
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="terms"
          className="form-checkbox"
          checked={termsChecked}
          onChange={(e) => setTermsChecked(e.target.checked)}
        />
        <label htmlFor="terms">Agree with Terms &amp; Conditions</label>
      </div>

      <button type="submit" className="signup-btn">
        Sign Up
      </button>
      <div className="or-divider"></div>
      <Link to="/signin" style={{ textDecoration: "none" }}>
        <h4>Already have an account?</h4>
      </Link>
    </form>
  );
}

export default SignupForm;
