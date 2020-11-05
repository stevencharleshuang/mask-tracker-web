import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../constants/firebase';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const unsubscribe = auth.onAuthStateChanged((user) => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  useEffect(() => unsubscribe(), []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const user = await auth.signInWithEmailAndPassword(
        formData.email,
        formData.password
      );

      window.localStorage.setItem('token', await user.user.getIdToken());
      setFormData({ email: '', password: '' });
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div>
      Login
      <div className="login-form">
        <input
          autoCapitalize="off"
          autoCorrect="off"
          maxLength="75"
          name="email"
          placeholder="email"
          type="text"
          className="login login-email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <input
          autoCapitalize="off"
          autoCorrect="off"
          maxLength="75"
          name="password"
          placeholder="password"
          type="password"
          className="login login-password"
          onChange={handleInputChange}
          value={formData.password}
        />
      </div>
      <div className="button-wrapper">
        <button onClick={handleSubmit}>Log In</button>
      </div>
      <div className="error-container">{error && <h4>{error}</h4>}</div>
      <div>
        Don't have an account? <Link to="register">Sign Up</Link>
      </div>
      {isLoggedIn && <Redirect to="/usermasks" />}
    </div>
  );
};

export default Login;
