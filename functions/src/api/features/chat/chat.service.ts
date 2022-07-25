import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();
export const chatCollection = db.collection('chats');

export const getChatById = async (id: string) => {
  return (await chatCollection.doc(id).get()).data();
};

export const getChatsByUid = async (uid: string) => {
  return (
    await chatCollection
      .where('members', 'array-contains', uid)
      .orderBy('date', 'desc')
      .get()
  ).docs.map((doc) => doc.data());
};

export const createChat = async () => {
  await chatCollection.doc().create({
    date: new Date().toISOString(),
  });
};

export const getMessagesFromChat = async (chatId: string) => {
  return (
    await chatCollection.doc(chatId).collection('messages').get()
  ).docs.map((doc) => doc.data());
};

export const createMessage = async (
  chatId: string,
  sender: string,
  text: string,
) => {
  await chatCollection.doc(chatId).collection('messages').doc().create({
    sender,
    text,
  });
};
