import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Text } from '../../../../components';
import { useReview } from '../../context';
import { Stars } from './Stars';

export const Summary = () => {
  const { average, reviews, filter, setFilter } = useReview();

  const handleFilter = () => {
    alert('Filter');
  };

  const handleSort = () => {
    alert('Sort');
  };

  const handleWrite = () => {
    alert('Write Review');
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.rating}>{average.toFixed(2)}</Text>
        <Stars rating={average} starStyle={styles.stars} />
        <Text style={styles.count}>{reviews.length} Reviews</Text>
      </View>
      <View style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button onPress={handleSort}>Sort</Button>
          <TextInput
            dense
            autoComplete="none"
            label="Filter Reviews"
            value={filter}
            onChange={(e) => setFilter(e.nativeEvent.text)}
            onSubmitEditing={handleFilter}
            right={
              <TextInput.Icon name="magnify" onPress={handleFilter} />
            }
          />
        </View>
        <Button
          onPress={handleWrite}
          style={{ alignSelf: 'flex-start' }}
        >
          Write Review
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summary: { alignSelf: 'flex-start', textAlign: 'center' },
  rating: {
    fontSize: 64,
    lineHeight: 64,
  },
  stars: {
    marginHorizontal: 'auto',
    fontSize: 30,
    lineHeight: 30,
  },
  count: {
    opacity: 0.75,
  },
});
