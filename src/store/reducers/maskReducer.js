import { GET_USER_MASKS, ADD_MASK } from '../actions/maskActions';

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
    case ADD_MASK:
      return {
        ...state,
        userMasks: state.userMasks.concat(action.payload),
      };
    default:
      return state;
  }
};

export default maskReducer;
