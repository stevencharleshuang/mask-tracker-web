import React from 'react';
import { auth } from '../constants/firebase';

const Header = (props) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User has signed out');
      window.localStorage.clear('token');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="App-header">
      <h1>Mask Tracker</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </header>
  );
};

export default Header;
