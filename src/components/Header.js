import React from 'react';
import { auth } from '../constants/firebase';
import { connect } from 'react-redux';

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
      {props.isAuthenticated && (
        <button onClick={handleSignOut}>Sign Out</button>
      )}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
