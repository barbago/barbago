import React from 'react';
import { View } from 'react-native';

import { Text } from '../../../../components';
import { Summary, Pagination, Review } from '../../components';
import { useReview } from '../../context';

export const ReviewSection = () => {
  const { response, displayed, page, limit } = useReview();

  return (
    <View style={{ padding: 16 }}>
      <Summary />
      {displayed.length < 1 ? (
        <Text>No matching reviews, sorry!</Text>
      ) : (
        <>
          <Pagination />
          {displayed
            .slice(page * limit, page * limit + limit)
            .map((review, index) => (
              <Review review={review} key={index} />
            ))}
          <Pagination />
        </>
      )}
    </View>
  );
};
