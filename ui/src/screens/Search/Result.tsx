import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Avatar, Card, Text, Caption } from 'react-native-paper';
import { VendorResponse } from '../../types';

interface ResultProps {
  vendor: VendorResponse;
}

export const Result = ({
  vendor: {
    uid,
    name,
    location,
    cover = '',
    avatar = '',
    rating = 'n/a',
    ratings = 0,
  },
}: ResultProps) => {
  // todo: find out correct typing
  const { push } = useNavigation<any>();

  const left = avatar
    ? () => (
        <Avatar.Image
          size={48}
          source={{ uri: avatar }}
          style={{ backgroundColor: 'transparent' }}
        />
      )
    : undefined;

  const right =
    rating && ratings
      ? () => (
          <>
            <Text>{rating}⭐</Text>
            <Caption>({ratings})</Caption>
          </>
        )
      : undefined;

  return (
    <Card onPress={() => push('Barber', { id: uid, screen: 'Info' })}>
      <Card.Cover source={{ uri: cover }} />
      <Card.Title
        title={name}
        subtitle={location}
        left={left}
        right={right}
        rightStyle={{ marginRight: 8 }}
      />
    </Card>
  );
};
