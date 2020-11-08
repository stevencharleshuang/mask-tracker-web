import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../constants/firebase';
import { connect } from 'react-redux';

import './header-styles.css';
import { logout } from '../store/actions/userActions';

const Header = (props) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.localStorage.clear('token');
      return props.logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="App-header">
      <h1>Mask Tracker</h1>
      <a href="/addmask">
        <h3>+</h3>
      </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
