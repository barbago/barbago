import React from 'react';
import { View } from 'react-native';

import { Summary, Pagination, Review } from '../../components';
import { useReview } from '../../context';

export const ReviewSection = () => {
  const { response, reviews, page, limit } = useReview();

  return (
    <View style={{ padding: 16 }}>
      <Summary />
      {reviews
        .slice(page * limit, page * limit + limit)
        .map((review, index) => (
          <Review review={review} key={index} />
        ))}
      <Pagination />
    </View>
  );
};
