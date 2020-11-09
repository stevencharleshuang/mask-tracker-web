import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Optional implementation
// ref: https://stackoverflow.com/questions/55520500/how-to-redirect-to-log-in-page-after-click-logout-button-on-navbar-header-in-rea
const Logout = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => setRedirect(true), []);

  return <div>{redirect && <Redirect to="/login" />}</div>;
};

export default Logout;
