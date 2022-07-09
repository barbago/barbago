import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '../../../../components';
import { useReview } from '../../context';
import { Stars } from './Stars';

export const Summary = () => {
  const { average, reviews } = useReview();

  return (
    <View style={styles.container}>
      <Text style={styles.rating}>{average.toFixed(2)}</Text>
      <Stars rating={average} starStyle={styles.stars} />
      <Text>{reviews.length} Reviews</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignSelf: 'flex-start', textAlign: 'center' },
  rating: {
    fontSize: 64,
  },
  stars: {
    fontSize: 30,
    lineHeight: 30,
  },
});
