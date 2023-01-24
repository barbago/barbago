import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Box, CustomLoader, Text } from '../Themed';
import { useAuth } from '../../providers';
import { userApi } from '../../store';

export interface AuthCardProps {}

export const AuthCard = ({}: AuthCardProps) => {
  const { data: profile, isLoading } = userApi.useGetUserQuery();
  const { signOut, user } = useAuth();
  const navigation = useNavigation<any>();

  const onPress = !!user ? signOut : () => navigation.push('Login');
  const title = !!user
    ? `Welcome, ${profile?.name ?? 'User'}!`
    : 'You are not signed in!';
  const source = user
    ? { uri: profile?.photo }
    : require('../../assets/images/no_avatar.png');
  const label = user ? 'Sign Out' : 'Log in or Sign up!';

  if (user && isLoading) return <CustomLoader />;

  return (
    <Box style={styles.card}>
      <Image
        source={source}
        defaultSource={require('../../assets/images/no_avatar.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{title}</Text>
        <Button onPress={onPress} style={styles.button} mode="outlined">
          {label}
        </Button>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: 100,
  },
  text: {
    fontSize: 20,
  },
  image: { width: 100, height: 100, marginRight: 16 },
  button: {},
});
