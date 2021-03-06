import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { db, auth } from '../constants/firebase';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isRegistered: false,
      formData: {
        email: '',
        fullname: '',
        username: '',
        password: '',
      },
    };
  }

  handleInputChange = (event, target) => {
    this.setState((prevState) => {
      prevState.formData[target] = event.target.value;
    });
  };

  handleSubmit = async () => {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        this.state.formData.email,
        this.state.formData.password
      );

      if (auth.currentUser && newUser.user.uid) {
        const uid = newUser.user.uid;
        const { email, fullname, username } = this.state.formData;
        const user = {
          email,
          fullname,
          uid,
          username,
        };

        await db.doc(`/users/${uid}`).set(user, { merge: true });
        await auth.currentUser.updateProfile({ displayName: username });

        this.setState({
          formData: {
            email: '',
            fullname: '',
            username: '',
            password: '',
          },
          isRegistered: true,
        });
      }
    } catch (error) {
      console.error(error.message);
      this.setState({ error: error.message });
    }
  };

  render = () => {
    return (
      <div className="register-container">
        <div className="register-header">
          <h2>Sign up to start tracking your masks</h2>
        </div>
        <div className="register-form">
          {['email', 'fullname', 'username', 'password'].map((el) => (
            <input
              autoCapitalize="off"
              autoCorrect="off"
              maxLength="75"
              key={el}
              name={el}
              placeholder={el}
              type={
                el === 'password' || el === 'email'
                  ? el === 'password'
                    ? 'password'
                    : 'email'
                  : 'text'
              }
              className={`register register-${el}`}
              onChange={(e) => this.handleInputChange(e, e.currentTarget.name)}
              value={this.state[el]}
            />
          ))}
        </div>
        <div className="register-button-wrapper">
          <span className="register-button" onClick={this.handleSubmit}>
            Sign Up
          </span>
        </div>
        <div>
          Already have an account? <Link to="/">Log In</Link>
        </div>
        <div className="error-container">
          {this.state.error && (
            <span className="error-message">{this.state.error}</span>
          )}
        </div>
        {this.state.isRegistered && <Redirect to="/" />}
      </div>
    );
  };
}
