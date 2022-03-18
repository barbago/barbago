import React from 'react';
import { Avatar, Card, Text, Caption } from 'react-native-paper';
import { BarberResult } from '../../types';

interface ResultProps {
  barber: BarberResult;
}

export const Result = ({
  barber: {
    name,
    location,
    cover = '',
    avatar = '',
    rating = 'n/a',
    ratings = 0,
  },
}: ResultProps) => {
  return (
    <Card>
      <Card.Cover source={{ uri: cover }} />
      <Card.Title
        title={name}
        subtitle={location}
        left={() => (
          <Avatar.Image
            size={48}
            source={{ uri: avatar }}
            style={{ backgroundColor: 'transparent' }}
          />
        )}
        right={() => (
          <>
            <Text>{rating}</Text>
            <Caption>({ratings})</Caption>
          </>
        )}
        rightStyle={{ marginRight: 16 }}
      />
    </Card>
  );
};
