import React from 'react';

const UserMasksList = (props) => {
  return (
    <div className="masks-list-container">
      <h1>Your masks</h1>
      <div className="masks-list">
        {props.userMasks.map((mask, i) => (
          <div
            id={mask.maskId}
            data-maskid={mask.maskId}
            data-brand={mask.brand}
            key={i}
            className="masks-list-item"
            onClick={(e) => props.handleShowMaskDetails(e)}
          >
            <h4 className="masks-list-title">{mask.maskNickname}</h4>
            <img className="masks-list-image" alt="mask" src={mask.photoURL} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMasksList;
