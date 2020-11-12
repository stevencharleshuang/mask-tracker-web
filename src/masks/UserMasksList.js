import React from 'react';
import { Link } from 'react-router-dom';

const UserMasksList = (props) => {
  return (
    <div className="masks-list-container">
      <h1>Your masks</h1>
      <div className="masks-list">
        {props.userMasks.length > 0 ? (
          props.userMasks.map((mask, i) => (
            <div
              id={mask.maskId}
              data-maskid={mask.maskId}
              data-brand={mask.brand}
              key={mask.maskId}
              className="masks-list-item"
              onClick={(e) => props.handleShowMaskDetails(e)}
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

export default UserMasksList;
