import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../constants/firebase';
import { login, logout, setUserData } from '../store/actions/userActions';

import './auth-styles.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      formData: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    };

    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.props.login();
        this.props.setUserData(await auth.currentUser);
        this.setState({ isLoggedIn: true });
      } else {
        console.log('no user is signed in');
        this.props.logout();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleInputChange = (e) => {
    this.setState(
      (prevState) => (prevState.formData[e.target.name] = e.target.value)
    );
  };

  handleSubmit = async () => {
    try {
      const user = await auth.signInWithEmailAndPassword(
        this.state.formData.email,
        this.state.formData.password
      );

      window.localStorage.setItem('token', await user.user.getIdToken());
      this.setState({ formData: { email: '', password: '' } });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-header">
          <h2>Let's go track your masks</h2>
        </div>
        <div className="login-form">
          <input
            autoCapitalize="off"
            autoCorrect="off"
            maxLength="75"
            name="email"
            placeholder="email"
            type="text"
            className="login login-email"
            onChange={(e) => this.handleInputChange(e)}
            value={this.state.formData.email}
          />
          <input
            autoCapitalize="off"
            autoCorrect="off"
            maxLength="75"
            name="password"
            placeholder="password"
            type="password"
            className="login login-password"
            onChange={(e) => this.handleInputChange(e)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') this.handleSubmit();
            }}
            value={this.state.formData.password}
          />
        </div>
        <div className="login-button-wrapper">
          <span className="login-button" onClick={this.handleSubmit}>
            Log In
          </span>
        </div>
        <div>
          Don't have an account? <Link to="register">Sign Up</Link>
        </div>
        <div className="error-container">
          {this.state.error && (
            <span className="error-message">{this.state.error}</span>
          )}
        </div>
        {this.state.isLoggedIn && <Redirect to="/usermasks" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = {
  login,
  logout,
  setUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
