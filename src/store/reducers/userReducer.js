import { SET_IS_AUTHENTICATED } from '../actions/userActions';

const initialState = {
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
