import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { googleConfig } from '../../config';
import { useAuth } from '../../providers';
import { GoogleAuthProvider } from 'firebase/auth';

maybeCompleteAuthSession();

const signInGoogle = (id_token: string) => {
  return GoogleAuthProvider.credential(id_token);
};

// https://docs.expo.dev/guides/authentication/#google
export function GoogleAuth() {
  const { signIn } = useAuth();

  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: googleConfig.clientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = signInGoogle(id_token);
      signIn(credential);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
    >
      Signup with Google
    </Button>
  );
}
