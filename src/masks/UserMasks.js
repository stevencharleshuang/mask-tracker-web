import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getUserMasks,
  deleteMask,
  selectMask,
} from '../store/actions/maskActions';
import { auth } from '../constants/firebase';

import UserMasksList from './UserMasksList';

import loadingSpinner from '../assets/loading.gif';
import './mask-styles.css';

class UserMasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMasks: [],
      selectedMask: null,
      showMaskDetails: false,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      await this.props.getUserMasks(auth.currentUser.uid);

      const userMasks = await this.props.userMasks;

      this.setState({ userMasks, loading: false });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="user-masks">
        {!this.props.isAuthenticated && <Redirect to="/login" />}
        {this.state.loading ? (
          <img
            className="app-loading-spinner"
            src={loadingSpinner}
            alt="loading spinner"
          />
        ) : (
          this.props.userMasks && (
            <UserMasksList
              loading={this.state.loading}
              userMasks={this.state.userMasks}
            />
          )
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getUserMasks,
  deleteMask,
  selectMask,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  userMasks: state.masks.userMasks,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMasks);
