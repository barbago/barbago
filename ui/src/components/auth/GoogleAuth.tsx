import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { useAuth } from '../../hooks';

maybeCompleteAuthSession();

// https://docs.expo.dev/guides/authentication/#google
export function GoogleAuth() {
  const { signInGoogle } = useAuth();
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId:
      '98881312343-921jrliba5991ah5g3pimfg9k3e2029j.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      signInGoogle(id_token);
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
