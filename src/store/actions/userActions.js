import { auth, db } from '../../constants/firebase';

export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const LOG_OUT = 'LOG_OUT';

export const login = () => ({
  type: SET_IS_AUTHENTICATED,
  payload: true,
});

export const logout = () => ({
  type: SET_IS_AUTHENTICATED,
  payload: false,
});
