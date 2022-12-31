import {
  ActionSheetOptions,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Text } from '../../../../components';
import { ReviewModel } from '../../../../types';
import { useReview, useVendor } from '../../context';
import { Pagination } from './Pagination';
import { Stars } from './Stars';
import { WriteDialog } from './WriteDialog';

export const Summary = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { vendor } = useVendor()!;
  const { reviews, filter, setFilter, setSort } = useReview();
  const [writeOpen, setWriteOpen] = useState(false);

  const sortOptions: {
    label: string;
    key?: keyof ReviewModel;
    asc?: boolean;
  }[] = [
    { label: 'Date (newest first)', key: 'date', asc: false },
    { label: 'Date (oldest first)', key: 'date', asc: true },
    { label: 'Rating (high first)', key: 'rating', asc: false },
    { label: 'Rating (low first)', key: 'rating', asc: true },
    { label: 'Cancel' },
  ];

  const average =
    (vendor?.ratingTotal ?? 0) / (vendor?.ratingCount ?? 0);

  const options: ActionSheetOptions = {
    options: sortOptions.map(({ label }) => label),
    title: 'What do you want to sort reviews by?',
    useModal: true,
    cancelButtonIndex: sortOptions.length - 1,
  };

  const actionSheetCallback = (
    index: number = sortOptions.length - 1,
  ) => {
    const { asc, key } = sortOptions[index];
    asc !== undefined && key !== undefined && setSort({ key, asc });
  };

  const handleSort = () => {
    showActionSheetWithOptions(options, actionSheetCallback);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.summary}>
          <Text style={styles.rating}>{average.toFixed(2)}</Text>
          <Stars rating={average} starStyle={styles.stars} />
          <Text style={styles.count}>
            {vendor?.ratingCount} Reviews
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-evenly',
            alignSelf: 'stretch',
          }}
        >
          <Button
            mode="contained"
            onPress={() => setWriteOpen(true)}
            icon="pencil"
            style={{ alignSelf: 'flex-end' }}
          >
            Write Review
          </Button>
          <TextInput
            dense
            label="Search Reviews"
            value={filter}
            onChange={(e) => setFilter(e.nativeEvent.text)}
            left={<TextInput.Icon icon="magnify" />}
          />
        </View>
      </View>

      <View style={styles.row}>
        <Pagination />
        <Button compact onPress={handleSort} icon="swap-vertical">
          Sort Reviews
        </Button>
      </View>
      <WriteDialog open={writeOpen} setOpen={setWriteOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
