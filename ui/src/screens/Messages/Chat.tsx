import React, { useCallback, useEffect, useMemo } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import { RootStackScreenProps } from '../../navigation';
import { useAuth } from '../../providers';
import { messageApi } from '../../store';
import { ChatListLoader } from './ChatListLoader';
import { getChatName, getUsersFromChat } from './utils';

export const Chat = ({
  navigation,
  route,
}: RootStackScreenProps<'Chat'>) => {
  const { id: chatId } = route.params;
  const { user } = useAuth();

  const [sendMessage] = messageApi.useSendMessageMutation();
  const { data: chats } = messageApi.useGetChatsQuery(user!.uid);
  const {
    data: messages,
    isLoading,
    isError,
  } = messageApi.useGetMessagesQuery(chatId);

  const chat = useMemo(
    () => chats?.find((chat) => chat.id === chatId),
    [chats, chatId],
  );

  const members = useMemo(
    () => (chat ? getUsersFromChat(chat) : []),
    [chat],
  );

  const onSend = useCallback(
    async (messages: IMessage[]) => {
      for (let message of messages) {
        await sendMessage({
          chatId,
          uid: user?.uid,
          text: message.text,
        });
      }
    },
    [chatId, user],
  );

  useEffect(() => {
    navigation.setOptions({ title: getChatName(chat, user?.uid) });
  }, [chat]);

  useEffect(() => {
    isError && navigation.replace('NotFound');
  }, [isError]);

  return (
    <>
      {!isLoading ? (
        <GiftedChat
          messages={messages?.map(({ id, text, date, sender }) => ({
            // _id: id,
            _id: date + text,
            text,
            createdAt: new Date(date),
            user: members.find(({ _id }) => _id === sender)!,
          }))}
          onSend={onSend}
          user={members.find(({ _id }) => _id === user?.uid)}
          alwaysShowSend={true}
          infiniteScroll
          loadEarlier
        />
      ) : (
        <ChatListLoader style={{ flexDirection: 'column-reverse' }} />
      )}
    </>
  );
};
