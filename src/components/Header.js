import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../constants/firebase';
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

  return (
    <header className="App-header">
      <Link to="/">
        <h1>Mask Tracker</h1>
      </Link>
      <span
        className="header-button"
        onClick={() => props.history.push('/addmask')}
      >
        <h3>+</h3>
      </span>
      {props.isAuthenticated && (
        <button onClick={handleSignOut}>Sign Out</button>
      )}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
