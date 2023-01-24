import { firestore } from 'firebase-functions/v1';
import { firestore as db, auth } from 'firebase-admin';
import { replaceAt } from '../utils';

export const userChanged = firestore
  .document('users/{uid}')
  .onWrite(async ({ after }, context) => {
    if (context.eventType === 'google.firestore.document.create')
      // if the document has just been created,
      // there is nothing to update
      return;

    const newData = after.data();
    const { uid } = context.params;

    let newName = newData?.name ?? 'Deleted User';
    let newPhoto =
      newData?.photo ??
      'https://firebasestorage.googleapis.com/v0/b/barbago-dev.appspot.com/o/shared%2Fno_avatar.png?alt=media&token=6ed32a24-0855-4030-b85e-dee2b214c5c3';

    try {
      await auth().updateUser(uid, {
        displayName: newName,
        photoURL: newPhoto,
        phoneNumber: newData?.phone,
        email: newData?.email,
      });
    } catch (err) {
      console.warn('error while trying to update auth user: ', err);
    }

    const batch = db().batch();

    const reviewSnap = await db()
      .collectionGroup('reviews')
      .where('authorId', '==', uid)
      .get();

    const chatSnap = await db()
      .collectionGroup('chats')
      .where('members', 'array-contains', uid)
      .get();

    reviewSnap.docs.forEach((doc) => {
      batch.update(doc.ref, {
        name: newName,
        avatar: newPhoto,
      });
    });

    chatSnap.docs.forEach((doc) => {
      const data = doc.data();
      const oldNames = (data?.memberNames ?? []) as string[];
      const oldPhotos = (data?.memberPhotos ?? []) as string[];
      const index = (doc.data()?.members as string[]).indexOf(uid);
      if (index <= -1) return;

      const newNames = replaceAt(oldNames, index, newName);
      const newPhotos = replaceAt(oldPhotos, index, newPhoto);
      batch.update(doc.ref, { memberNames: newNames });
      newPhotos && batch.update(doc.ref, { memberPhotos: newPhotos });
    });

    await batch.commit();
  });
