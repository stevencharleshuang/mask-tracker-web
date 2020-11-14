import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { capitalize } from '../utils/helperFunctions';

const UserMaskDetails = (props) => {
  const [maskDetails, setMaskDetails] = useState({});
  const {
    brand,
    hoursRemaining,
    hoursWorn,
    maskColor,
    maskNickname,
    maskType,
    maskId,
    photoURL,
    startDate,
    totalHours,
  } = { ...props.mask };

  useEffect(() => {
    setMaskDetails({ ...props.selectedMask });
  }, []);

  // TODO: The component is rendering twice for some reason... hooks hijinks?
  // console.log(maskDetails);

  return (
    <div className="mask-details">
      <h1>{maskDetails.maskNickname}</h1>
      <div className="mask-options">
        <span
          className="mask-options-button"
          data-id={maskDetails.maskId}
          onClick={props.handleEditMask}
        >
          Edit Mask
        </span>
        <span
          className="mask-options-button"
          data-id={maskDetails.maskId}
          onClick={props.handleDeleteMask}
        >
          Delete Mask
        </span>
      </div>
      <div className="mask-details-container">
        <div className="mask-details-container-item-image">
          <img
            alt="mask image"
            className="mask-details-image"
            src={maskDetails.photoURL}
          />
        </div>
        <div className="mask-details-container-item-details">
          <ul>
            <li>Brand: {capitalize(maskDetails.brand)}</li>
            <li>Mask Color: {capitalize(maskDetails.maskColor)}</li>
            <li>Mask Type: {capitalize(maskDetails.maskType)}</li>
            <li>Total Hours: {maskDetails.totalHours} hours</li>
            <li>Hours Worn: {maskDetails.hoursWorn} hours</li>
            <li>Hours Remaining: {maskDetails.hoursRemaining} hours</li>
            {/* <li>Start Date: {startDate}</li> */}
          </ul>
        </div>
      </div>

      <Link to="#" onClick={props.handleHideMaskDetails}>
        Back to your masks
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedMask: state.masks.selectedMask,
});

export default connect(mapStateToProps)(UserMaskDetails);
