import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { firebaseConfig } from './env';

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
// https://github.com/expo/expo/issues/14734
export const db = initializeFirestore(firebaseApp, {
  experimentalAutoDetectLongPolling: true,
});

// https://docs.expo.dev/versions/latest/sdk/firebase-analytics/
