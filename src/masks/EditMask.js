import React from 'react';
import { connect } from 'react-redux';

import { updateMask } from '../store/actions/maskActions';

class EditMask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    if (this.props.location.state) {
      const {
        brand,
        hoursRemaining,
        hoursWorn,
        maskColor,
        maskId,
        maskNickname,
        maskType,
        totalHours,
      } = this.props.location.state.selectedMask;

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
        userMasks: this.props.location.state.userMasks,
      };
    }

    console.log(this.state);
  }

  componentDidMount = () => {};

  // TODO: Add change handler
  handleChange = (e) => {};

  // TODO: Add submit handler
  handleSubmit = async () => {
    try {
      const [maskId, userMasks] = [this.state.maskId, this.state.userMasks];
      const updatedMaskDetails = { ...this.state.maskDetails };
      // Call redux action
      this.props.updateMask(maskId, userMasks, updatedMaskDetails);
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
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateMask,
};

export default connect(null, mapDispatchToProps)(EditMask);
