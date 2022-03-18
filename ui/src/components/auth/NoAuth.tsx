import React from 'react';
import { Button } from 'react-native-paper';

import { useAuth } from '../../hooks';

export function NoAuth() {
  const { signInAnonymous } = useAuth();
  return (
    <Button onPress={signInAnonymous}>
      Continue without account
    </Button>
  );
}
