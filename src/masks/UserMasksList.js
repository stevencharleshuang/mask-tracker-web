import React from 'react';

const UserMasksList = (props) => {
  return (
    <div className="user-masks">
      <h1>Your masks</h1>
      {props.userMasks.map((mask) => (
        <div
          id={mask.maskId}
          data-maskid={mask.maskId}
          data-brand={mask.brand}
          key={mask.maskId}
          className="mask-container"
          onClick={(e) => props.handleShowMaskDetails(e)}
        >
          <h4 className="mask-title">{mask.maskNickname}</h4>
          <img className="mask-image" alt="mask image" src={mask.photoURL} />
        </div>
      ))}
    </div>
  );
};

export default UserMasksList;
