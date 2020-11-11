import React from 'react';
import { Link } from 'react-router-dom';

import { capitalize } from '../utils/helperFunctions';

const UserMaskDetails = (props) => {
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

  return (
    <div className="mask-details">
      <h3>{maskNickname}</h3>
      <div className="mask-details-container">
        <div className="mask-details-container-item-image">
          <img alt="mask image" className="mask-details-image" src={photoURL} />
        </div>
        <div className="mask-details-container-item-details">
          <ul>
            <li>Brand: {capitalize(brand)}</li>
            <li>Mask Color: {capitalize(maskColor)}</li>
            <li>Mask Type: {capitalize(maskType)}</li>
            <li>Total Hours: {totalHours} hours</li>
            <li>Hours Worn: {hoursWorn} hours</li>
            <li>Hours Remaining: {hoursRemaining} hours</li>
            {/* <li>Start Date: {startDate}</li> */}
          </ul>
          <button id={maskId} onClick={props.handleDeleteMask}>
            Delete Mask
          </button>
          <Link to="#" onClick={props.handleHideMaskDetails}>
            Back to your masks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserMaskDetails;
