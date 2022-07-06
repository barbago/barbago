import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { Text } from '../../../../components';
import { useReview } from '../../context';

export const Pagination = () => {
  const { reviews, page, setPage, limit } = useReview();

  return (
    <View style={{ flexDirection: 'row' }}>
      <Button
        title="prev"
        disabled={page < 1}
        onPress={() => {
          setPage(page - 1);
        }}
      />
      <Text>
        {page}, {limit}
      </Text>
      <Button
        title="next"
        disabled={page >= Math.floor((reviews.length - 1) / limit)}
        onPress={() => {
          setPage(page + 1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
