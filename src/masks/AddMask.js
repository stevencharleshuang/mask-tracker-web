import React from 'react';
import { connect } from 'react-redux';

import { addMask } from '../store/actions/maskActions';

class AddMask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      brand: 'Happy Masks',
      totalHours: 0,
      maskColor: '',
      maskNickname: '',
      maskType: '',
      photoURL: '',
      startDate: '',
    };
  }

  handleChange = (e) => {
    this.setState((prevState) => (prevState[e.target.name] = e.target.value));
  };

  render = () => {
    console.log(this.state);
    return (
      <div className="add-mask">
        <div className="form-container">
          <label for="mask-nickname">Mask Nickname</label>
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
          <label for="brand">Mask Brand</label>
          <select id="brand" name="brand" onChange={this.handleChange}>
            <option value="Happy Masks">Happy Masks</option>
            <option value="Planet Masks">Planet Masks</option>
          </select>
          <label for="mask-color">Mask Color</label>
          <select id="mask-color" name="maskColor" onChange={this.handleChange}>
            <option value="black">Black</option>
            <option value="blue">Navy Blue</option>
            <option value="gray">Gray</option>
          </select>
          <label for="mask-type">Mask Type</label>
          <select id="mask-type" name="maskType" onChange={this.handleChange}>
            <option value="reusable">Reusable</option>
            <option value="disposable">Disposable</option>
          </select>
          <button
            onClick={() => this.setState((prevState) => prevState.counter++)}
          >
            re-render
          </button>
        </div>
      </div>
    );
  };
}

const mapDispatchToProps = {
  addMask,
};

export default connect(null, mapDispatchToProps)(AddMask);
