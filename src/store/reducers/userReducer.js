import { SET_IS_AUTHENTICATED, SET_USER_DATA } from '../actions/userActions';

const initialState = {
  userData: {},
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
