import {
  addDoc,
  collection,
  getDocs,
  limit,
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
  messageCount?: number;
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

const messageQuery = (chatId: string, page: number = 1) =>
  query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('date', 'desc'),
    limit(25 * page),
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
    getMessages: builder.query<
      MessageModel[],
      { chatId: string; page?: number }
    >({
      queryFn: async ({ chatId }) => ({
        data: (await getDocs(messageQuery(chatId))).docs.map(
          (doc) => doc.data() as MessageModel,
        ),
      }),
      onCacheEntryAdded: async ({ chatId, page }, api) => {
        await api.cacheDataLoaded;
        const unsubscribe = onSnapshot(
          messageQuery(chatId, page),
          (snap) => {
            const messages: MessageModel[] = [];
            snap.docs.forEach((doc) =>
              messages.push(doc.data() as MessageModel),
            );
            api.updateCachedData((draft) => {
              draft.splice(0, draft.length, ...messages);
            });
          },
        );
        await api.cacheEntryRemoved;
        unsubscribe();
      },
    }),
    sendMessage: builder.mutation<any, any>({
      // // todo: use the server to handle new messages
      // // while injecting sent values into cache
      // query: ({ chatId, text }) => ({
      //   url: `chats/${chatId}`,
      //   method: 'post',
      //   body: { text },
      // }),
      queryFn: async ({ chatId, uid, text }) => {
        const message = {
          text,
          date: new Date().toISOString(),
          sender: uid,
        };
        await addDoc(
          collection(db, 'chats', chatId, 'messages'),
          message,
        );
        return { data: message };
      },
    }),
  }),
  overrideExisting: true,
});
