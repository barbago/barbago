import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import { Text } from '../../../../components';
import { useThemeColor } from '../../../../hooks';
import { useReview } from '../../context';

export const Pagination = () => {
  const { displayed, page, setPage, limit } = useReview();

  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');

  const styles = StyleSheet.create({
    container: { flexDirection: 'row' },
    buttons: { backgroundColor },
    icon: { fontSize: 20, color },
    page: {},
  });

  return (
    <View style={styles.container}>
      <TouchableHighlight
        disabled={page < 1}
        onPress={() => {
          setPage(page - 1);
        }}
        style={styles.buttons}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          style={styles.icon}
        />
      </TouchableHighlight>

      <Text style={styles.page}>
        Page {page + 1} of {Math.ceil(displayed.length / limit)}
      </Text>

      <TouchableHighlight
        disabled={page >= Math.floor((displayed.length - 1) / limit)}
        onPress={() => {
          setPage(page + 1);
        }}
        style={styles.buttons}
      >
        <MaterialCommunityIcons
          name="chevron-right"
          style={styles.icon}
        />
      </TouchableHighlight>
    </View>
  );
};
