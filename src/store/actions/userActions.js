import { auth, db } from '../../constants/firebase';

export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const LOG_OUT = 'LOG_OUT';
export const GET_USER_MASKS = 'GET_USER_MASKS';

export const login = () => ({
  type: SET_IS_AUTHENTICATED,
  payload: true,
});

export const logout = () => ({
  type: SET_IS_AUTHENTICATED,
  payload: false,
});

export const getUserMasks = (uid) => async (dispatch) => {
  try {
    const userMasks = [];
    const maskData = await db
      .collection('masks')
      .where('ownerId', '==', uid)
      .get();
    maskData.forEach((mask) => userMasks.push(mask.data()));

    console.log({ userMasks });
    return dispatch({ type: GET_USER_MASKS, payload: userMasks });
  } catch (error) {
    console.error(error);
  }
};
