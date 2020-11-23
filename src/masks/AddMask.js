import React from 'react';
import { connect } from 'react-redux';

import { addMask } from '../store/actions/maskActions';

import maskDigest from './maskDigest';

class AddMask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: 'Happy Masks',
      hoursRemaining: 0,
      hoursWorn: 0,
      maskColor: 'black',
      maskNickname: '',
      maskType: 'reusable',
      totalHours: 0,
    };
  }

  handleChange = (e, isNum) => {
    isNum
      ? this.setState(
          (prevState) => (prevState[e.target.name] = parseInt(e.target.value))
        )
      : this.setState(
          (prevState) => (prevState[e.target.name] = e.target.value)
        );
  };

  handleReset = () => {
    this.setState({
      brand: 'Happy Masks',
      hoursRemaining: 0,
      hoursWorn: 0,
      maskColor: 'black',
      maskNickname: '',
      maskType: 'reusable',
      totalHours: 0,
    });
  };

  handleSubmit = async () => {
    try {
      const newMask = {
        brand: this.state.brand,
        hoursRemaining: this.state.hoursRemaining,
        hoursWorn: this.state.hoursWorn,
        maskColor: this.state.maskColor,
        maskNickname: this.state.maskNickname,
        maskType: this.state.maskType,
        totalHours: this.state.totalHours,
      };

      newMask.hoursRemaining = newMask.totalHours - newMask.hoursWorn;

      if (this.state.brand === 'Happy Masks' && this.state.maskColor)
        newMask.photoURL = maskDigest.happyMasks[this.state.maskColor].photoURL;

      await this.props.addMask(newMask);

      this.props.history.push('/usermasks');
    } catch (error) {
      console.error(error);
    }
  };

  render = () => {
    return (
      <div className="add-mask">
        <h1>Add a mask to track</h1>
        <div className="add-mask-container">
          <div className="mask-image-container">
            {this.state.brand === 'Happy Masks' && this.state.maskColor ? (
              <img
                alt="mask preview"
                src={maskDigest.happyMasks[this.state.maskColor].photoURL}
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
                value={this.state.maskNickname}
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
                value={this.state.totalHours}
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
                value={this.state.hoursWorn}
              />
            </div>
            {/* <div className="add-mask-form-button-wrapper">
              <span className="add-mask-form-button" onClick={this.handleReset}>
                Reset
              </span>
            </div> */}
            <div className="add-mask-form-button-wrapper">
              <span
                className="add-mask-form-button"
                onClick={this.handleSubmit}
              >
                Submit
              </span>
            </div>
            <span
              className="app-link"
              onClick={() => this.props.history.goBack()}
            >
              Back from whence you came
            </span>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return { userData: state.user.userData };
};

const mapDispatchToProps = {
  addMask,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMask);
