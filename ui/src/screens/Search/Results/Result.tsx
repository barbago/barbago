import React from 'react';
import { Avatar, Card, Text, Caption } from 'react-native-paper';

import { VendorResponse } from '../../../types';
import { useSearch } from '../services';

interface ResultProps {
  vendor: VendorResponse;
}

export const Result = ({ vendor }: ResultProps) => {
  const {
    name,
    location,
    cover = '',
    avatar = '',
    ratingTotal = 0,
    ratingCount = 0,
  } = vendor;
  const average = ratingTotal / ratingCount || 0;

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

  const right = () => (
    <>
      {!!average && (
        <Text style={{ textAlign: 'right' }}>
          {average.toFixed(2)}⭐
        </Text>
      )}
      <Caption>({ratingCount || 'No'} reviews)</Caption>
    </>
  );

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
