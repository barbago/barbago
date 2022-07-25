import { firestore } from 'firebase-functions';
import { firestore as db } from 'firebase-admin';

export const reviewWritten = firestore
  .document('vendors/{vendorId}/reviews/{authorId}')
  .onWrite(async (change, context) => {
    db().doc(`vendors/${context.params.vendorId}`);
    console.warn(change, context);
  });

export const messageCreated = firestore
  .document('chats/{chatId}/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    await db().doc(`chats/${context.params.chatId}`).update({
      lastMessage: snapshot.data().text,
      date: context.timestamp,
    });
  });
