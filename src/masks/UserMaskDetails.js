import React from 'react';
import { Link } from 'react-router-dom';

const UserMaskDetails = (props) => {
  const {
    brand,
    hoursRemaining,
    hoursWorn,
    maskColor,
    maskNickname,
    maskType,
    ownerId,
    photoURL,
    startDate,
    totalHours,
  } = { ...props.mask };

  return (
    <div className="mask-details-container">
      <h3>{maskNickname}</h3>
      <img alt="mask image" src={photoURL} />
      <ul>
        <li>Brand: {brand}</li>
        <li>Mask Color: {maskColor}</li>
        <li>Mask Type: {maskType}</li>
        <li>Total Hours: {totalHours} hours</li>
        <li>Hours Worn: {hoursWorn} hours</li>
        <li>Hours Remaining: {hoursRemaining} hours</li>
        {/* <li>Start Date: {startDate}</li> */}
      </ul>
      <Link to="" onClick={() => props.handleHideMaskDetails()}>
        Back to your masks
      </Link>
    </div>
  );
};

export default UserMaskDetails;
