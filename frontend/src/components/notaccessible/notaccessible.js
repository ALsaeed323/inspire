import React from 'react';
import './notaccessible.css';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
  
    return (
      <section className="py-5">
        <div className="d-flex justify-content-center align-items-center flex-column text-center w-100">
          <div className="bg_img w-50"></div>
          <div>
            <p className="display-4">Looks Like You're In Wrong Way</p>
            <p>The page you are looking for is not Accessible...</p>
            {user && user.role === 'user' ? (
              <a href="/profile" className="text-white text-decoration-none px-4 py-3 bg-success d-inline-block mt-2 rounded">
                Go to Home
              </a>
            ) : user && user.role === 'admin' ? (
              <a href="/dashboard" className="text-white text-decoration-none px-4 py-3 bg-success d-inline-block mt-2 rounded">
                Go to Home
              </a>
            ) : (
              <a href="/" className="text-white text-decoration-none px-4 py-3 bg-success d-inline-block mt-2 rounded">
                Go to Home
              </a>
            )}
          </div>
        </div>
      </section>
    );
};

export default NotFound;
