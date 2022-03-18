import React from 'react';
import { Button } from 'react-native-paper';
import { useAuth } from '../../hooks';

export const SignOut = () => {
  const { user, signOut } = useAuth();

  return (
    <Button disabled={!user} onPress={signOut}>
      Sign Out
    </Button>
  );
};
