import { User } from 'firebase/auth';
import React from 'react';
import { List, Text } from 'react-native-paper';
import { RootTabScreenProps } from '../../navigation';
import { ChatModel, messageApi } from '../../store';
import { relativeTimeFromDates } from '../../utils';
import { ChatListLoader } from './ChatListLoader';
import { NoMessages } from './NoMessages';

const right = (date?: string) =>
  date
    ? () => <Text>{relativeTimeFromDates(new Date(date))}</Text>
    : undefined;

export interface ChatListProps {
  user: User;
  navigation: RootTabScreenProps<'Messages'>['navigation'];
}

export const ChatList = ({ user, navigation }: ChatListProps) => {
  const { data: chats, isLoading } = messageApi.useGetChatsQuery(
    user.uid,
  );

  const getChatName = (chat: ChatModel) => {
    return (
      chat.memberNames
        ?.filter((_, i) => i !== chat.members.indexOf(user.uid))
        .join(', ') || 'Just Me'
    );
  };

  return (
    <>
      {!isLoading ? (
        chats?.length && chats.length > 1 ? (
          chats?.map((chat, i) => (
            <List.Item
              key={i}
              title={getChatName(chat)}
              description={chat.lastMessage}
              right={right(chat?.date)}
              onPress={() =>
                navigation.push('Chat', {
                  id: chat.id,
                })
              }
            />
          ))
        ) : (
          <NoMessages />
        )
      ) : (
        <ChatListLoader />
      )}
    </>
  );
};
