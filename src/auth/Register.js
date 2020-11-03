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

      if (newUser.user.uid) {
        const uid = newUser.user.uid;
        const { email, fullname, username } = this.state.formData;
        const user = {
          email,
          fullname,
          uid,
          username,
        };

        await db.doc(`/users/${uid}`).set(user, { merge: true });
      }
    } catch (error) {
      console.error(error.message);
      this.setState({ error: error.message });
    }
  };

  render = () => {
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
            onChange={(e) => this.handleInputChange(e, e.currentTarget.name)}
            value={this.state.email}
          />
          <input
            autoCapitalize="off"
            autoCorrect="off"
            maxLength="75"
            name="fullname"
            placeholder="fullname"
            type="text"
            className="register register-fullname"
            onChange={(e) => this.handleInputChange(e, e.currentTarget.name)}
            value={this.state.fullname}
          />
          <input
            autoCapitalize="off"
            autoCorrect="off"
            maxLength="75"
            name="username"
            placeholder="username"
            type="text"
            className="register register-username"
            onChange={(e) => this.handleInputChange(e, e.currentTarget.name)}
            value={this.state.username}
          />
          <input
            autoCapitalize="off"
            autoCorrect="off"
            maxLength="75"
            name="password"
            placeholder="password"
            type="password"
            className="register register-password"
            onChange={(e) => this.handleInputChange(e, e.currentTarget.name)}
            value={this.state.password}
          />
        </div>
        <div className="button-wrapper">
          <button onClick={this.handleSubmit}>Sign Up</button>
        </div>
        <div className="error-container">
          {this.state.error && <h4>{this.state.error}</h4>}
        </div>
        <div>
          Have an account? <Link to="/">Log In</Link>
        </div>
        {this.isRegistered && <Redirect to="/login" />}
      </div>
    );
  };
}
