import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCgaQWRG-hIyv1hZXYZ8sq8jGSEuDzAkjg',
  authDomain: 'barbago-dev.firebaseapp.com',
  projectId: 'barbago-dev',
  storageBucket: 'barbago-dev.appspot.com',
  messagingSenderId: '98881312343',
  appId: '1:98881312343:web:2558cf7dcedbb3892f7512',
  measurementId: 'G-QKKBRRQC54',
};

export const firebaseApp = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
