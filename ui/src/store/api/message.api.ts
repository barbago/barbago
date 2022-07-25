import {
  collection,
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
  text: string;
  sender: string;
}

export const chatPath = 'chats';

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<ChatModel[], string>({
      query: (_uid) => `${chatPath}`,
      onCacheEntryAdded: async (uid, api) => {
        await api.cacheDataLoaded;
        const q = query(
          collection(db, 'chats'),
          orderBy('date', 'desc'),
          where('members', 'array-contains', uid),
        );
        const unsubscribe = onSnapshot(q, (snap) => {
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
      query: (chatId) => `${chatPath}/${chatId}`,
      onCacheEntryAdded: async (chatId, api) => {
        await api.cacheDataLoaded;
        const q = query(
          collection(db, 'chats', chatId, 'messages'),
          // orderBy('date', 'desc'),
        );
        const unsubscribe = onSnapshot(q, (snap) => {
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
