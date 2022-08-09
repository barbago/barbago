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

export const createChat = async (members: any[]) => {
  const date = new Date().toISOString();

  const docRef = chatCollection.doc();

  const params = {
    id: docRef.id,
    date,
    members: members.map(({ uid }) => uid),
    memberNames: members.map(({ name }) => name ?? null),
    memberPhotos: members.map(({ photo }) => photo ?? null),
  };

  await docRef.create(params);

  return params;
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
  const params = { sender, text, date: new Date().toISOString() };
  await chatCollection
    .doc(chatId)
    .collection('messages')
    .doc()
    .create(params);
  return params;
};
