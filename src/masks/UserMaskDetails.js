import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteMask, deselectMask } from '../store/actions/maskActions';
import { capitalize } from '../utils/helperFunctions';

const UserMaskDetails = (props) => {
  const [maskDetails, setMaskDetails] = useState({});
  const [userMasks, setUserMasks] = useState([]);

  useEffect(() => {
    setMaskDetails({ ...props.selectedMask });
    setUserMasks(props.userMasks);
  }, []);

  // TODO: The component is rendering twice for some reason... hooks hijinks?
  // console.log(maskDetails);

  const handleEditMask = () =>
    props.history.push({
      pathname: '/editmask',
      state: {
        selectedMask: maskDetails,
        userMasks,
      },
    });

  const handleDeleteMask = async (e) => {
    try {
      await props.deleteMask(e.target.dataset.id, userMasks);

      await props.deselectMask();
      await props.history.push({
        pathname: '/usermasks',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mask-details">
      <h1>{maskDetails.maskNickname}</h1>
      <div className="mask-options">
        <span
          className="mask-options-button"
          data-id={maskDetails.maskId}
          onClick={handleEditMask}
        >
          Edit Mask
        </span>
        <span
          className="mask-options-button"
          data-id={maskDetails.maskId}
          onClick={(e) => handleDeleteMask(e)}
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

      <Link to="/usermasks" onClick={() => props.deselectMask()}>
        Back to your masks
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedMask: state.masks.selectedMask,
  userMasks: state.masks.userMasks,
});

const mapDispatchToProps = {
  deleteMask,
  deselectMask,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMaskDetails);
