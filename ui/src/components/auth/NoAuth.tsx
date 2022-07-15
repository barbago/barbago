import React from 'react';
import { Button } from 'react-native-paper';

import { useAuth } from '../../providers';

export function NoAuth() {
  const { signInAnonymous } = useAuth();
  return (
    <Button onPress={signInAnonymous}>Continue without account</Button>
  );
}
