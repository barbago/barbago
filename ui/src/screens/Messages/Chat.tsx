import React, { useEffect } from 'react';
import { View } from 'react-native';

import { Text } from '../../components';
import { RootStackScreenProps } from '../../navigation';
import { messageApi } from '../../store';

export const Chat = ({
  navigation,
  route,
}: RootStackScreenProps<'Chat'>) => {
  const chatId = route.params.id;

  const { data: messages } = messageApi.useGetMessagesQuery(chatId);

  useEffect(() => {
    navigation.setOptions({
      title: chatId ?? 'Loading Chat...',
    });
  }, [chatId]);

  // useEffect(() => {
  //   isError && navigation.replace('NotFound');
  // }, [isError]);

  return (
    <View>
      {messages?.map((message, i) => (
        <Text key={i}>{message.text}</Text>
      ))}
    </View>
  );
};
