import { auth, db, firebase } from '../../constants/firebase';

export const GET_USER_MASKS = 'GET_USER_MASKS';
export const ADD_MASK = 'ADD_MASK';

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

export const addMask = (payload) => async (dispatch) => {
  try {
    const newMask = {
      ownerId: auth.currentUser.uid,
      ...payload,
      startDate: firebase.firestore.Timestamp.now(),
    };

    const newMaskRef = await db.collection('masks').doc();
    await newMaskRef.set({ ...newMask, maskId: newMaskRef.id });

    return dispatch({ type: ADD_MASK, payload: newMask });
  } catch (error) {
    console.error(error);
  }
};
