import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteMask, deselectMask } from '../store/actions/maskActions';
import { capitalize } from '../utils/helperFunctions';
import loadingSpinner from '../assets/loading.gif';

class UserMaskDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      maskDetails: {},
      userMasks: [],
    };
  }

  async componentDidMount() {
    try {
      const maskDetails = await this.props.selectedMask;
      const userMasks = await this.props.userMasks;

      this.setState({
        maskDetails,
        userMasks,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: The component is rendering twice for some reason... hooks hijinks?
  // console.log(maskDetails);

  handleEditMask = () =>
    this.props.history.push({
      pathname: '/editmask',
      state: {
        selectedMask: this.props.selectedMask,
        userMasks: this.props.userMasks,
      },
    });

  handleDeleteMask = async (e) => {
    try {
      await this.props.deleteMask(e.target.dataset.id, this.state.userMasks);

      await this.props.deselectMask();
      await this.props.history.push({
        pathname: '/usermasks',
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    console.log(this.state, this.props);
    return (
      <div className="mask-details">
        {this.state.loading ? (
          <div className="app-loading-spinner-wrapper">
            <img
              className="app-loading-spinner"
              src={loadingSpinner}
              alt="app-loading spinner"
            />
          </div>
        ) : (
          <div className="mask-details">
            <h1>{this.state.maskDetails.maskNickname}</h1>
            <div className="mask-options">
              <span
                className="mask-options-button"
                data-id={this.state.maskDetails.maskId}
                onClick={this.handleEditMask}
              >
                Edit Mask
              </span>
              <span
                className="mask-options-button"
                data-id={this.state.maskDetails.maskId}
                onClick={(e) => this.handleDeleteMask(e)}
              >
                Delete Mask
              </span>
            </div>
            <div className="mask-details-container">
              <div className="mask-details-container-item-image">
                <img
                  alt="mask"
                  className="mask-details-image"
                  src={this.state.maskDetails.photoURL}
                />
              </div>
              <div className="mask-details-container-item-details">
                <ul>
                  <li>Brand: {capitalize(this.state.maskDetails.brand)}</li>
                  <li>
                    Mask Color: {capitalize(this.state.maskDetails.maskColor)}
                  </li>
                  <li>
                    Mask Type: {capitalize(this.state.maskDetails.maskType)}
                  </li>
                  <li>
                    Total Hours: {this.state.maskDetails.totalHours} hours
                  </li>
                  <li>Hours Worn: {this.state.maskDetails.hoursWorn} hours</li>
                  <li>
                    Hours Remaining:{' '}
                    {this.state.maskDetails.hoursRemaining <= 0 ? (
                      <span className="app-warning-text">
                        Expired
                        <br />
                        <br />
                        Time for a new mask, maybe?
                      </span>
                    ) : (
                      <span className="app-okay-text">
                        {this.state.maskDetails.hoursRemaining} hours
                      </span>
                    )}
                  </li>
                  {/* <li>Start Date: {startDate}</li> */}
                </ul>
              </div>
            </div>

            <Link to="/usermasks" onClick={() => this.props.deselectMask()}>
              Back to your masks
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMask: state.masks.selectedMask,
  userMasks: state.masks.userMasks,
});

const mapDispatchToProps = {
  deleteMask,
  deselectMask,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMaskDetails);
