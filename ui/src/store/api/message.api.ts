import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../config';
import { api } from './base.api';

export interface ChatModel {
  id: string;
  date: string;
  members: string[];
  memberNames?: string[];
  memberLinks?: (string | null)[];
  memberPhotos?: string[];
  lastMessage?: string;
}

export interface MessageModel {
  id: string;
  text: string;
  sender: string;
  date: string;
}

export const chatPath = 'chats';

const chatsQuery = (uid: string) =>
  query(
    collection(db, 'chats'),
    orderBy('date', 'desc'),
    where('members', 'array-contains', uid),
  );

const messageQuery = (chatId: string) =>
  query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('date', 'desc'),
  );

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<ChatModel[], string>({
      queryFn: async (uid) => ({
        data: (await getDocs(chatsQuery(uid))).docs.map(
          (doc) => doc.data() as ChatModel,
        ),
      }),
      onCacheEntryAdded: async (uid, api) => {
        await api.cacheDataLoaded;
        const unsubscribe = onSnapshot(chatsQuery(uid), (snap) => {
          const chats: ChatModel[] = [];
          snap.docs.forEach((doc) => {
            chats.push(doc.data() as ChatModel);
          });
          api.updateCachedData((draft) => {
            draft.splice(0, draft.length, ...chats);
          });
        });
        await api.cacheEntryRemoved;
        unsubscribe();
      },
    }),
    getMessages: builder.query<MessageModel[], string>({
      queryFn: async (chatId) => ({
        data: (await getDocs(messageQuery(chatId))).docs.map(
          (doc) => doc.data() as MessageModel,
        ),
      }),
      onCacheEntryAdded: async (chatId, api) => {
        await api.cacheDataLoaded;
        const unsubscribe = onSnapshot(messageQuery(chatId), (snap) => {
          const messages: MessageModel[] = [];
          snap.docs.forEach((doc) =>
            messages.push(doc.data() as MessageModel),
          );
          api.updateCachedData((draft) => {
            draft.splice(0, draft.length, ...messages);
          });
        });
        await api.cacheEntryRemoved;
        unsubscribe();
      },
    }),
  }),
  overrideExisting: true,
});
