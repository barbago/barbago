import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  LoadEarlier,
  Send,
  Time,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from '../../hooks';
import { RootRoutes, RootStackScreenProps } from '../../navigation/types';
import { useAuth } from '../../providers';
import { messageApi } from '../../store';
import { isWeb } from '../../utils';
import { ChatListLoader } from './ChatListLoader';
import { getChatName, getUsersFromChat } from './utils';

export const Chat = memo(
  ({ navigation, route }: RootStackScreenProps<RootRoutes.Chat>) => {
    const { id: chatId } = route.params;
    const { user } = useAuth();
    const [page, setPage] = useState(1);

    const [sendMessage] = messageApi.useSendMessageMutation();
    const { data: chats } = messageApi.useGetChatsQuery(user!.uid);
    const {
      data: messages,
      isLoading,
      isFetching,
      isError,
    } = messageApi.useGetMessagesQuery({ chatId, page });

    const chat = useMemo(
      () => chats?.find((chat) => chat.id === chatId),
      [chats, chatId],
    );

    const members = useMemo(
      () => (chat ? getUsersFromChat(chat) : []),
      [chat],
    );

    const loadEarlier = useMemo(
      () => !!((messages?.length ?? 0) < (chat?.messageCount ?? 0)),
      [chat, messages?.length],
    );

    const onLoadEarlier = () => setPage(page + 1);

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
      isError && navigation.replace(RootRoutes.NotFound);
    }, [isError]);

    const textColor = useThemeColor({}, 'text');
    const tintColor = useThemeColor({}, 'tint');
    const inputColor = useThemeColor({}, 'background');
    const { bottom } = useSafeAreaInsets();

    const renderBubble = (props: any) => {
      const padding = isWeb() ? 5 : 0;
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              padding,
              backgroundColor: textColor + '2',
            },
            right: {
              padding,
              backgroundColor: tintColor,
            },
          }}
          textStyle={{
            left: { color: textColor },
            right: { color: 'white' },
          }}
          renderTime={(props: any) => (
            <Time
              {...props}
              timeTextStyle={{ left: { color: textColor + '7' } }}
            />
          )}
        />
      );
    };

    const renderInputToolbar = (props: any) => (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: inputColor,
          borderTopColor: textColor + '2',
        }}
        primaryStyle={{
          marginBottom: bottom,
        }}
      />
    );

    const renderLoadEarlier = (props: any) => (
      <LoadEarlier {...props} isLoadingEarlier={isFetching} />
    );

    const renderSend = (props: any) => (
      <Send {...props} textStyle={{ color: tintColor }} />
    );

    if (isLoading)
      return (
        <ChatListLoader style={{ flexDirection: 'column-reverse' }} />
      );

    return (
      <GiftedChat
        messages={messages?.map(({ text, date, sender }) => ({
          // _id: id,
          _id: date + text,
          text,
          createdAt: new Date(date),
          user: members.find(({ _id }) => _id === sender)!,
        }))}
        onSend={onSend}
        user={members.find(({ _id }) => _id === user?.uid)}
        alwaysShowSend={true}
        // fixes issue with chat being cut,
        // but puts text area in the notch
        wrapInSafeArea={false}
        infiniteScroll
        loadEarlier={loadEarlier}
        onLoadEarlier={onLoadEarlier}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderLoadEarlier={renderLoadEarlier}
        renderSend={renderSend}
        // @ts-ignore
        placeholderTextColor={textColor + '8'}
        textInputStyle={{ color: textColor }}
        messagesContainerStyle={{ paddingBottom: bottom }}
      />
    );
  },
  (prev, next) => prev.route.params.id !== next.route.params.id,
);
