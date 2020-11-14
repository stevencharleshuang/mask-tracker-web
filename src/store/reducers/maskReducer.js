import {
  ADD_MASK,
  GET_USER_MASKS,
  UPDATE_MASK,
  DELETE_MASK,
  SELECT_MASK,
} from '../actions/maskActions';

const initialState = {
  userMasks: [],
  selectedMask: null,
};

const maskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MASK:
      return {
        ...state,
        userMasks: state.userMasks.concat(action.payload),
      };
    case GET_USER_MASKS:
      return {
        ...state,
        userMasks: action.payload,
      };
    case UPDATE_MASK:
      return {
        ...state,
        userMasks: action.payload,
      };
    case DELETE_MASK:
      return {
        ...state,
        userMasks: action.payload,
      };
    case SELECT_MASK:
      return {
        ...state,
        selectedMask: action.payload,
      };
    default:
      return state;
  }
};

export default maskReducer;
