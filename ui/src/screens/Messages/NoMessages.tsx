import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../components';

export const NoMessages = () => {
  const navigation = useNavigation<any>();

  return (
    <Box style={styles.container}>
      <Text>You have no messages!</Text>
      <Text>Search for a barber to start talking to!</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});
