import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateMask } from '../store/actions/maskActions';
import maskDigest from './maskDigest';

class EditMask extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.selectedMask) {
      const {
        brand,
        hoursRemaining,
        hoursWorn,
        maskColor,
        maskId,
        maskNickname,
        maskType,
        totalHours,
      } = this.props.selectedMask;

      this.state = {
        maskId: maskId ? maskId : null,
        maskDetails: {
          brand: brand ? brand : 'Happy Masks',
          hoursRemaining: hoursRemaining ? hoursRemaining : 0,
          hoursWorn: hoursWorn ? hoursWorn : 0,
          maskColor: maskColor ? maskColor : 'black',
          maskNickname: maskNickname ? maskNickname : '',
          maskType: maskType ? maskType : 'reusable',
          totalHours: totalHours ? totalHours : 0,
        },
        userMasks: this.props.userMasks,
      };
    }

    console.log(this.state);
  }

  componentDidMount = () => {};

  handleChange = (e) => {
    this.setState(
      (prevState) => (prevState.maskDetails[e.target.name] = e.target.value)
    );
  };

  handleSubmit = async () => {
    try {
      const [maskId, userMasks] = [this.state.maskId, this.state.userMasks];
      const updatedMaskDetails = { ...this.state.maskDetails };

      await this.props.updateMask(maskId, userMasks, updatedMaskDetails);
      await this.props.history.push({ pathname: '/usermaskdetails' });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="edit-mask">
        <h1>Edit Mask</h1>
        {!this.state && <h4>Something is amiss here...</h4>}
        {/* TODO: render form with fields placeheld by state */}
        <div className="add-mask-container">
          <div className="mask-image-container">
            {this.state.maskDetails.brand === 'Happy Masks' &&
            this.state.maskDetails.maskColor ? (
              <img
                alt="mask preview"
                src={
                  maskDigest.happyMasks[this.state.maskDetails.maskColor]
                    .photoURL
                }
              />
            ) : (
              <div className="mask-image-container-null-image" />
            )}
          </div>
          <div className="form-container">
            <div className="form-item">
              <label htmlFor="mask-nickname">Mask Nickname</label>
              <br />
              <input
                autoCapitalize="on"
                autoCorrect="off"
                maxLength="75"
                name="maskNickname"
                placeholder="Mask Nickname"
                type="text"
                id="mask-nickname"
                onChange={(e) => this.handleChange(e)}
                value={this.state.maskDetails.maskNickname}
              />
            </div>
            <div className="form-item">
              <label htmlFor="brand">Mask Brand</label>
              <br />
              <select id="brand" name="brand" onChange={this.handleChange}>
                <option value="Happy Masks">Happy Masks</option>
                <option value="Planet Masks">Planet Masks</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="mask-color">Mask Color</label>
              <br />
              <select
                id="mask-color"
                name="maskColor"
                onChange={this.handleChange}
              >
                <option value="black">Black</option>
                <option value="blue">Navy Blue</option>
                <option value="gray">Gray</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="mask-type">Mask Type</label>
              <br />
              <select
                id="mask-type"
                name="maskType"
                onChange={this.handleChange}
              >
                <option value="reusable">Reusable</option>
                <option value="disposable">Disposable</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="total-hours">Mask Longevity</label>
              <br />
              <input
                autoCapitalize="on"
                autoCorrect="off"
                maxLength="10"
                name="totalHours"
                placeholder="0"
                type="number"
                id="total-hours"
                onChange={(e) => this.handleChange(e, true)}
                value={this.state.maskDetails.totalHours}
              />
            </div>
            <div className="form-item">
              <label htmlFor="hours-worn">Hours Worn</label>
              <br />
              <input
                autoCapitalize="on"
                autoCorrect="off"
                maxLength="10"
                name="hoursWorn"
                placeholder="0"
                type="number"
                id="hours-worn"
                onChange={(e) => this.handleChange(e, true)}
                value={this.state.maskDetails.hoursWorn}
              />
            </div>
            <div className="form-item">
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
            {/* <button
            onClick={() => this.setState((prevState) => prevState.counter++)}
          >
            re-render
          </button> */}
            <Link to="/usermaskdetails">Back from whence you came</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMask: state.masks.selectedMask,
  userMasks: state.masks.userMasks,
});

const mapDispatchToProps = {
  updateMask,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMask);
