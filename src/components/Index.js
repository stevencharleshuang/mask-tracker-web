import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import loadingSpinner from '../assets/loading.gif';

const Index = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  console.log(props, isLoading);

  useEffect(() => {
    // props.isAuthenticated && setIsLoading(false);
  }, []);

  return (
    <div>
      {true ? (
        <img
          className="app-loading-spinner"
          src={loadingSpinner}
          alt="loading spinner"
        />
      ) : null}
      {/*
      ) : props.isAuthenticated ? (
        <Redirect to="/usermasks" />
      ) : (
        <Redirect to="/login" />
      )}
      */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Index);
