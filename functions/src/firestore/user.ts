import { firestore } from 'firebase-functions/v1';
import { firestore as db } from 'firebase-admin';
import { replaceAt } from '../utils';

export const userChanged = firestore
  .document('users/{uid}')
  .onWrite(async ({ after }, context) => {
    // if the document has just been created,
    // there is nothing to update
    if (context.eventType === 'google.firestore.document.create')
      return;

    const { uid } = context.params;

    let newName = after.data()?.name ?? 'Deleted User';
    let newPhoto = after.data()?.photo ?? ''; // todo: put the url of default user icon

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
