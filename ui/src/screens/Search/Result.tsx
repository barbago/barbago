import React from 'react';
import { Avatar, Card, Text, Caption } from 'react-native-paper';

import { VendorResponse } from '../../types';
import { useSearch } from './SearchPage';

interface ResultProps {
  vendor: VendorResponse;
}

export const Result = ({ vendor }: ResultProps) => {
  const {
    name,
    location,
    cover = '',
    avatar = '',
    rating = 'n/a',
    ratings = 0,
  } = vendor;

  const { openVendor } = useSearch();

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
    <Card onPress={() => openVendor(vendor)}>
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
