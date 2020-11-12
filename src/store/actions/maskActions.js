import { auth, db, firebase } from '../../constants/firebase';

export const ADD_MASK = 'ADD_MASK';
export const GET_USER_MASKS = 'GET_USER_MASKS';
export const UPDATE_MASK = 'UPDATE_MASK';
export const DELETE_MASK = 'DELETE_MASK';

export const addMask = (maskDetails) => async (dispatch) => {
  try {
    const newMask = {
      ownerId: auth.currentUser.uid,
      ...maskDetails,
      startDate: firebase.firestore.Timestamp.now(),
    };

    const newMaskRef = await db.collection('masks').doc();
    await newMaskRef.set({ ...newMask, maskId: newMaskRef.id });

    return dispatch({ type: ADD_MASK, payload: newMask });
  } catch (error) {
    console.error(error);
  }
};

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

export const updateMask = (maskId, userMasks, updatedMaskDetails) => async (
  dispatch
) => {
  try {
    // update mask on firebase
    // filter userMasks and return all masks except the one to be updated
    // add the updated mask to the updated masks arr
    // return dispatch({ type: UPDATE_MASK, payload });
  } catch (error) {
    console.error(error);
  }
};

export const deleteMask = (maskId, userMasks) => async (dispatch) => {
  try {
    const deletedMaskRef = await db.collection('masks').doc(`/${maskId}`).get();
    await deletedMaskRef.ref.delete();

    const updatedUserMasks = userMasks.filter((mask) => mask.maskId !== maskId);

    return dispatch({ type: DELETE_MASK, payload: updatedUserMasks });
  } catch (error) {
    console.error(error);
  }
};
