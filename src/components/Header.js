import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { auth, db } from '../constants/firebase';
import { connect } from 'react-redux';

import { logout } from '../store/actions/userActions';
import './header-styles.css';

const Header = (props) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.localStorage.clear('token');
      props.logout();
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: This is dirty code, get rid of it
  if (auth.currentUser && !auth.currentUser.displayName) {
    try {
      (async () => {
        const username = await (
          await db.collection(`/users`).doc(`/${auth.currentUser.uid}`).get()
        ).data().username;

        await auth.currentUser.updateProfile({ displayName: username });
      })();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="App-header">
      {!props.isAuthenticated && <Redirect to="/login" />}
      <div className="header-left header-container">
        <Link to="/">
          <h1>Mask Tracker</h1>
        </Link>
      </div>
      <div className="header-right header-container">
        {props.isAuthenticated && auth.currentUser.displayName && (
          <div className="header-right-container">
            <span className="header-greeting">
              <h3>Hi, {auth.currentUser.displayName}</h3>
            </span>
          </div>
        )}
        {props.isAuthenticated && (
          <div className="header-right-container">
            <span
              className="header-button add-mask-button"
              onClick={() => props.history.push('/addmask')}
            >
              <h3>+</h3>
            </span>
          </div>
        )}
        <div className="header-right-container log-out-button">
          {props.isAuthenticated && (
            <span className="header-button" onClick={handleSignOut}>
              Log Out
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
