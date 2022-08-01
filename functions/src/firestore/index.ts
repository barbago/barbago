import { firestore as db } from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { firestore } from 'firebase-functions';

export const reviewWritten = firestore
  .document('vendors/{vendorId}/reviews/{authorId}')
  .onWrite(async (change, context) => {
    db().doc(`vendors/${context.params.vendorId}`);
    console.warn(change, context);
  });

// todo: keep track of reviews for creation, changing, deletion

export const messageCreated = firestore
  .document('chats/{chatId}/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    await db()
      .doc(`chats/${context.params.chatId}`)
      .update({
        lastMessage: snapshot.data().text,
        date: context.timestamp,
        messageCount: FieldValue.increment(1),
      });
  });

// todo: decrement message count if message deleted
