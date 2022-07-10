import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Text } from '../../../../components';
import { useReview } from '../../context';
import { Stars } from './Stars';

export const Summary = () => {
  const { average, reviews, filter, setFilter } = useReview();

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
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'space-evenly',
          alignSelf: 'stretch',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            dense
            autoComplete="none"
            label="Filter Reviews"
            value={filter}
            onChange={(e) => setFilter(e.nativeEvent.text)}
            right={<TextInput.Icon name="magnify" />}
            style={{ minWidth: 150 }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={handleSort}>Sort</Button>
          <Button
            mode="contained"
            onPress={handleWrite}
            style={{ alignSelf: 'flex-start' }}
          >
            Write Review
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summary: {
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginRight: 8,
  },
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
