import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();
export const userCollection = db.collection('users');

export const createUser = async (uid: string, params: any) => {
  await userCollection.doc(uid).create(params);
  return params;
};

export const getUserByUid = async (uid: string) => {
  return (await userCollection.doc(uid).get()).data();
};

export const updateUser = async (uid: string, params: any) => {
  await userCollection.doc(uid).update(params);
  return params;
};

export const deleteUser = async (uid: string) => {
  await userCollection.doc(uid).delete();
};
