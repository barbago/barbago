import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '../../../../components';
import { useReview } from '../../context';
import { Stars } from './Stars';

export const Summary = () => {
  const { average } = useReview();

  return (
    <View>
      <Text style={styles.rating}>{average.toFixed(2)}</Text>
      <Stars rating={average} starStyle={styles.stars} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  rating: {
    fontSize: 64,
    // textAlign: 'center',
  },
  stars: {
    fontSize: 30,
    lineHeight: 30,
  },
});
