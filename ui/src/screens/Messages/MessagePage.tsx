import React from 'react';
import { List, Text } from 'react-native-paper';
import { Screen } from '../../components';
import { RootTabScreenProps } from '../../navigation/types';
import { useAuth } from '../../providers';
import { ChatModel, messageApi } from '../../store';
import { relativeTimeFromDates } from '../../utils';

const right = (date?: string) =>
  date
    ? () => <Text>{relativeTimeFromDates(new Date(date))}</Text>
    : undefined;

export const MessagePage: React.FC<RootTabScreenProps<'Messages'>> = ({
  navigation,
  children,
}) => {
  const { user } = useAuth();
  const { data: chats, isLoading } = messageApi.useGetChatsQuery(
    user!.uid,
  );

  const getChatName = (chat: ChatModel) => {
    return (
      chat.memberNames
        ?.filter((_, i) => i !== chat.members.indexOf(user!.uid))
        .join(', ') || 'Just Me'
    );
  };

  return (
    <Screen scrolling>
      {!isLoading ? (
        chats?.map((chat, i) => (
          <List.Item
            key={i}
            title={getChatName(chat)}
            description={chat.lastMessage}
            right={right(chat?.date)}
            onPress={() => navigation.push('Chat', { id: chat.id })}
          />
        ))
      ) : (
        <Text>Loading Messages...</Text>
      )}
    </Screen>
  );
};

/**
 * What is the messaging API going to look like?
 *
 */
