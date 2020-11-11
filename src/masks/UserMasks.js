import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserMasks, deleteMask } from '../store/actions/maskActions';
import { auth } from '../constants/firebase';

import UserMasksList from './UserMasksList';
import UserMaskDetails from './UserMaskDetails';

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
      console.log(userMasks);
      this.setState({ userMasks, loading: false });
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

  handleDeleteMask = async (e) => {
    try {
      await this.props.deleteMask(e.target.id, this.state.userMasks);
      const userMasks = await this.props.userMasks;

      this.setState({
        userMasks,
        selectedMask: null,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        {!this.props.isAuthenticated && <Redirect to="/login" />}
        {this.state.selectedMask ? (
          <UserMaskDetails
            mask={this.state.selectedMask}
            handleHideMaskDetails={this.handleHideMaskDetails}
            handleDeleteMask={(e) => this.handleDeleteMask(e)}
          />
        ) : (
          this.props.userMasks && (
            <UserMasksList
              loading={this.state.loading}
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
  deleteMask,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  userMasks: state.mask.userMasks,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMasks);
