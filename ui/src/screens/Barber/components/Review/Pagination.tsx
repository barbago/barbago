import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '../../../../components';
import { useThemeColor } from '../../../../hooks';
import { useReview } from '../../context';

export const Pagination = () => {
  const { displayed, page, setPage, limit } = useReview();

  const color = useThemeColor({}, 'text');

  const styles = StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: `${color}4`,
      borderWidth: 1,
      borderRadius: 4,
      marginVertical: 8,
    },
    buttons: { padding: 4 },
    icon: { fontSize: 20, color },
    page: {},
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
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
      </TouchableOpacity>

      <Text style={styles.page}>
        Page {page + 1} of {Math.ceil(displayed.length / limit)}
      </Text>

      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};
