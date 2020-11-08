import { auth, db } from '../../constants/firebase';

export const GET_USER_MASKS = 'GET_USER_MASKS';

export const getUserMasks = (uid) => async (dispatch) => {
  try {
    const userMasks = [];
    const maskData = await db
      .collection('masks')
      .where('ownerId', '==', uid)
      .get();

    maskData.forEach((mask) => userMasks.push(mask.data()));

    return dispatch({ type: GET_USER_MASKS, payload: userMasks });
  } catch (error) {
    console.error(error);
  }
};

export const addMask = (uid) => async (dispatch) => {
  try {
  } catch (error) {
    console.error(error);
  }
};
