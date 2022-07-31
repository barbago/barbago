import { User } from 'react-native-gifted-chat';

import { ChatModel } from '../../store';

export const getUsersFromChat = (chat?: ChatModel): User[] => {
  return (
    chat?.members.map((uid, index) => ({
      _id: uid,
      name: chat?.memberNames?.[index] ?? '',
      avatar: chat?.memberPhotos?.[index],
      link: chat?.memberLinks?.[index],
    })) || []
  );
};

export const getChatName = (chat?: ChatModel, uid?: string): string =>
  getUsersFromChat(chat)
    .filter(({ _id }) => _id !== uid)
    .map(({ name }) => name)
    .join(', ') || 'Just Me';
