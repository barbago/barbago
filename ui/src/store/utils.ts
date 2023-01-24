import {
  getExpoPushTokenAsync,
  requestPermissionsAsync,
} from 'expo-notifications';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config';
import { isMobile } from '../utils';
import { setPushToken } from './auth';
import { AppDispatch, RootState } from './store';

export const registerPushToken = async (dispatch: AppDispatch) => {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await requestPermissionsAsync();

    const token = isMobile()
      ? (await getExpoPushTokenAsync()).data
      : undefined;

    if (token) {
      await updateDoc(doc(db, 'users', user.uid), { pushToken: token });
      dispatch(setPushToken(token));
    }
  } catch (_) {}
};

export const revokePushToken = async (
  getState: () => RootState,
  dispatch: AppDispatch,
) => {
  const user = auth.currentUser;
  const token = getState().auth.pushToken;
  if (!user || !token) return;
  try {
    await updateDoc(doc(db, 'users', user.uid), { pushToken: null });
  } catch (_) {}
  dispatch(setPushToken(null));
};
