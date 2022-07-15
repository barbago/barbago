import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { googleConfig } from '../../config';
import { useAuth } from '../../providers';

maybeCompleteAuthSession();

// https://docs.expo.dev/guides/authentication/#google
export function GoogleAuth() {
  const { signInGoogle } = useAuth();
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: googleConfig.clientId,
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
