import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (formData) => {};

  return (
    <div>
      Register
      <div className="register-form">
        <input
          autoCapitalize="off"
          autoCorrect="off"
          maxLength="75"
          name="email"
          placeholder="email"
          type="text"
          className="register register-email"
          onChange={() => {}}
          value={email}
        />
        <input
          autoCapitalize="off"
          autoCorrect="off"
          maxLength="75"
          name="fullname"
          placeholder="fullname"
          type="text"
          className="register register-fullname"
          onChange={() => {}}
          value=""
        />
        <input
          autoCapitalize="off"
          autoCorrect="off"
          maxLength="75"
          name="username"
          placeholder="username"
          type="text"
          className="register register-username"
          onChange={() => {}}
          value=""
        />
        <input
          autoCapitalize="off"
          autoCorrect="off"
          maxLength="75"
          name="email"
          placeholder="password"
          type="password"
          className="register register-password"
          onChange={() => {}}
          value=""
        />
      </div>
      <div>
        Have an account? <Link to="/">Log In</Link>
      </div>
    </div>
  );
};

export default Register;
