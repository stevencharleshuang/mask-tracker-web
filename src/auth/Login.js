import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const handleLoginSubmit = (formData) => {};

  return (
    <div>
      Login
      <div className="login-form">
        <input
          autocapitalize="off"
          autocorrect="off"
          maxlength="75"
          name="email"
          placeholder="email"
          type="text"
          className="login login-email"
          value=""
        />
        <input
          autocapitalize="off"
          autocorrect="off"
          maxlength="75"
          name="email"
          placeholder="password"
          type="password"
          className="login login-password"
          value=""
        />
      </div>
      <div>
        Don't have an account? <Link to="register">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
