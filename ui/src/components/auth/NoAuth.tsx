import { signInAnonymously } from 'firebase/auth';
import React from 'react';
import { Button } from 'react-native-paper';

import { auth } from '../../config';

export function NoAuth() {
  return (
    <Button onPress={() => signInAnonymously(auth)}>
      Continue without account
    </Button>
  );
}
