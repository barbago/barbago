import { ExpoPushMessage } from 'expo-server-sdk';
import { firestore } from 'firebase-functions/v1';
import { firestore as db } from 'firebase-admin';
import { FieldPath, FieldValue } from 'firebase-admin/firestore';
import { sendNotifications } from '../utils';

export const messageCreated = firestore
  .document('chats/{chatId}/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const { sender: senderId, text } = snapshot.data();
    const { chatId } = context.params;

    const chatRef = db().doc(`chats/${chatId}`);

    await chatRef.update({
      lastMessage: snapshot.data().text,
      date: context.timestamp,
      messageCount: FieldValue.increment(1),
    });

    const memberIds = (await chatRef.get()).data()?.members as string[];

    console.log(memberIds);

    const members = (
      await db()
        .collection('users')
        .where(FieldPath.documentId(), 'in', memberIds)
        .get()
    ).docs.map((doc) => doc.data());

    console.log(members);

    const sender = members.find(({ uid }) => uid === senderId)!;

    console.log(sender);

    const messages: ExpoPushMessage[] = members
      .filter(({ uid }) => uid !== senderId)
      .map((recipient) => ({
        to: recipient.pushToken,
        body: text,
        title: sender.name,
        sound: 'default',
        data: { path: `messages/${chatId}` },
      }));

    console.log(messages);

    await sendNotifications(messages);
  });

export const messageDeleted = firestore
  .document('chats/{chatId}/messages/{messageId}')
  .onDelete(async (_snapshot, context) => {
    await db()
      .doc(`chats/${context.params.chatId}`)
      .update({
        messageCount: FieldValue.increment(-1),
      });
  });
