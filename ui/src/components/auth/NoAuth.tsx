import { signInAnonymously } from 'firebase/auth';
import React from 'react';
import { Button } from 'react-native-paper';

import { auth } from '../../config';
import { AuthButtonProps } from './AuthButton';

export function NoAuth({ onAuthSuccess }: AuthButtonProps) {
  return (
    <Button
      uppercase={false}
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        width: '100%',
        maxWidth: 350,
        borderRadius: 25,
      }}
      contentStyle={{
        height: 50,
        paddingHorizontal: 40,
      }}
      labelStyle={{
        letterSpacing: 0,
        fontSize: 18,
      }}
      onPress={() => signInAnonymously(auth).then(onAuthSuccess)}
    >
      Continue without account
    </Button>
  );
}
