import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserMasks } from '../store/actions/userActions';
import { auth } from '../constants/firebase';

import UserMasksList from './UserMasksList';
import UserMaskDetails from './UserMaskDetails';

class UserMasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMasks: [],
      selectedMask: null,
      showMaskDetails: false,
    };
  }

  async componentDidMount() {
    try {
      await this.props.getUserMasks(auth.currentUser.uid);
      const userMasks = await this.props.userMasks;
      this.setState({ userMasks });
    } catch (error) {
      console.error(error);
    }
  }

  handleShowMaskDetails = (e) => {
    const selectedMask = this.state.userMasks.filter(
      (mask) => mask.maskId === e.target.id
    );
    this.setState({ selectedMask: selectedMask[0] });
  };

  handleHideMaskDetails = () => this.setState({ selectedMask: null });

  render() {
    return (
      <div>
        {!this.props.isAuthenticated && <Redirect to="/login" />}
        {this.state.selectedMask ? (
          <UserMaskDetails
            mask={this.state.selectedMask}
            handleHideMaskDetails={this.handleHideMaskDetails}
          />
        ) : (
          this.props.userMasks && (
            <UserMasksList
              userMasks={this.state.userMasks}
              handleShowMaskDetails={this.handleShowMaskDetails}
            />
          )
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getUserMasks,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  userMasks: state.userMasks,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMasks);
