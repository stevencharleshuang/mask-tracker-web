import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectMask } from '../store/actions/maskActions';

const UserMasksList = (props) => {
  return (
    <div className="masks-list-container">
      <h1>Masks You Be Tracking</h1>
      <div className="masks-list">
        {props.userMasks.length > 0 ? (
          props.userMasks.map((mask, i) => (
            <Link to="/usermaskdetails" key={mask.maskId}>
              <div
                id={mask.maskId}
                data-maskid={mask.maskId}
                data-brand={mask.brand}
                className="masks-list-item"
                onClick={() => props.selectMask(mask)}
              >
                <h4 className="masks-list-title" id={mask.maskId}>
                  {mask.maskNickname}
                </h4>
                <img
                  className="masks-list-image"
                  id={mask.maskId}
                  alt="mask"
                  src={mask.photoURL}
                />
              </div>
            </Link>
          ))
        ) : (
          <div className="masks-list-null">
            <h4>You ain't got no masks, Lt. Dan...</h4>
            <br />
            <Link to="/addmask">Add a mask</Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  selectMask,
};

export default connect(null, mapDispatchToProps)(UserMasksList);
