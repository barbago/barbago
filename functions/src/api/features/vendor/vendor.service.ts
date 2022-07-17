import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();
const vendorCollection = db.collection('vendors');

export const getVendorByUid = async (uid: string) => {
  // figure out how to join subcollections
  return (await vendorCollection.doc(uid).get()).data();
};

export const createVendor = async (uid: string, params: any) => {
  await vendorCollection.doc(uid).create(params);
  return params;
};

export const updateVendor = async (uid: string, params: any) => {
  await vendorCollection.doc(uid).set(params);
  return params;
};

export const deleteVendor = async (uid: string) => {
  return await vendorCollection.doc(uid).delete();
};

export const searchVendors = async (params: any) => {
  // 'Cannot have inequality filters on multiple properties: [latitude, longitude]',
  // time to figure out geohashes
  return (await vendorCollection.get()).docs.map((doc) => doc.data());
};
