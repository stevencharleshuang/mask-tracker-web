import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserMasks = (props) => {
  return (
    <div>
      <h1>Your masks</h1>
      {!props.isAuthenticated && <Redirect to="/login" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(UserMasks);
