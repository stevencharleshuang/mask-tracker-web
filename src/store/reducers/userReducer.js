import { SET_IS_AUTHENTICATED, GET_USER_MASKS } from '../actions/userActions';

const initialState = {
  isAuthenticated: false,
  userMasks: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case GET_USER_MASKS:
      return {
        ...state,
        userMasks: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
