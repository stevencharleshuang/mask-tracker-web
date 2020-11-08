import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Index = (props) => {
  return (
    <div>
      {props.isAuthenticated ? (
        <Redirect to="/usermasks" />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Index);
