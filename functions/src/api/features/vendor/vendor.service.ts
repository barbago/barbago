import { getFirestore } from 'firebase-admin/firestore';
import {
  distanceBetween,
  geohashForLocation,
  geohashQueryBounds,
} from 'geofire-common';

const db = getFirestore();
export const vendorCollection = db.collection('vendors');

export const getVendorByLink = async (link: string) => {
  return (
    await vendorCollection.where('link', '==', link).limit(1).get()
  ).docs?.[0]?.data();
};

export const getVendorByUid = async (uid: string) => {
  // todo: figure out how to join subcollections
  return (await vendorCollection.doc(uid).get()).data();
};

export const createVendor = async (uid: string, params: any) => {
  const { latitude, longitude } = params;
  const geohash = geohashForLocation([latitude, longitude]);

  await vendorCollection.doc(uid).create({ ...params, geohash });
  return params;
};

export const updateVendor = async (uid: string, params: any) => {
  const { latitude, longitude } = params;
  const geohash =
    latitude && longitude
      ? geohashForLocation([latitude, longitude])
      : undefined;

  const fields = {
    ...params,
    geohash,
  };

  await vendorCollection.doc(uid).update(fields);
  return params;
};

export const deleteVendor = async (uid: string) => {
  return await vendorCollection.doc(uid).delete();
};

export const searchVendors = async (params: any) => {
  const {
    distance: radiusMeters,
    latitude: lat1,
    longitude: lng1,
  } = params;

  const bounds = geohashQueryBounds([lat1, lng1], radiusMeters);

  const snapshots = await Promise.all(
    bounds.map((bound) =>
      vendorCollection
        .orderBy('geohash')
        .startAt(bound[0])
        .endAt(bound[1])
        .limit(100)
        .get(),
    ),
  );

  // todo: refactor this to look nice
  const matches: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
    [];

  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const lat2 = doc.get('latitude');
      const lng2 = doc.get('longitude');

      const distanceInM =
        distanceBetween([lat1, lng1], [lat2, lng2]) * 1000;
      if (distanceInM <= radiusMeters) {
        matches.push(doc);
      }
    }
  }

  return matches.map((doc) => doc.data());
  // const matchess = snapshots.map((snap) =>
  //   snap.docs.filter((doc) => {
  //     const { latitude: lat2, longitude: lng2 } = doc.data();
  //     if (!lat2 || !lng2) return false;
  //     const distanceMeters =
  //       distanceBetween([lat1, lng1], [lat2, lng2]) * 1000;

  //     if (distanceMeters <= radiusMeters) return true;
  //   }),
  // );
};
