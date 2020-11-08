import { GET_USER_MASKS } from '../actions/maskActions';

const initialState = {
  userMasks: [],
};

const maskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_MASKS:
      return {
        ...state,
        userMasks: action.payload,
      };
    default:
      return state;
  }
};

export default maskReducer;
