import { User } from 'firebase/auth';
import React from 'react';
import { List, Text } from 'react-native-paper';
import { ActionMessage } from '../../components';
import {
  MainRoutes,
  RootRoutes,
  RootTabScreenProps,
} from '../../navigation';
import { messageApi } from '../../store';
import { relativeTimeFromDates } from '../../utils';
import { ChatListLoader } from './ChatListLoader';
import { getChatName } from './utils';

const right = (date?: string) =>
  date
    ? () => <Text>{relativeTimeFromDates(new Date(date))}</Text>
    : undefined;

export interface ChatListProps {
  user: User;
  navigation: RootTabScreenProps<MainRoutes.Messages>['navigation'];
}

export const ChatList = ({ user, navigation }: ChatListProps) => {
  const { data: chats, isLoading } = messageApi.useGetChatsQuery(
    user.uid,
  );

  const findBarbers = () =>
    navigation.navigate(RootRoutes.Main, {
      screen: MainRoutes.Search,
    });

  return (
    <>
      {!isLoading ? (
        chats?.length && chats.length > 0 ? (
          chats?.map((chat, i) => (
            <List.Item
              key={i}
              title={getChatName(chat, user.uid)}
              description={chat.lastMessage}
              right={right(chat?.date)}
              onPress={() =>
                navigation.push(RootRoutes.Chat, {
                  id: chat.id,
                })
              }
            />
          ))
        ) : (
          <ActionMessage
            message="You have no messages! Find a barber to start talking now!"
            actions={[
              { label: 'Search for Barbers', handler: findBarbers },
            ]}
          />
        )
      ) : (
        <ChatListLoader />
      )}
    </>
  );
};
