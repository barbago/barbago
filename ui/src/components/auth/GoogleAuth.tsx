import React, { useEffect, useMemo } from 'react';
import { Button } from 'react-native-paper';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { googleConfig } from '../../config';
import { useAuth } from '../../providers';
import { GoogleAuthProvider } from 'firebase/auth';
import { useColorScheme } from '../../hooks';
import { AuthButtonProps } from './AuthButton';

maybeCompleteAuthSession();

const signInGoogle = (id_token: string) => {
  return GoogleAuthProvider.credential(id_token);
};

// https://docs.expo.dev/guides/authentication/#google
export function GoogleAuth({ onAuthSuccess }: AuthButtonProps) {
  const { signIn } = useAuth();
  const scheme = useColorScheme();
  const primary = '#de5246';

  const isDarkMode = useMemo(() => scheme === 'dark', [scheme]);

  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: googleConfig.webClientId,
    iosClientId: googleConfig.iosClientId,
    androidClientId: googleConfig.androidClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = signInGoogle(id_token);
      signIn(credential).then(onAuthSuccess);
    }
  }, [response]);

  return (
    <Button
      icon="google"
      mode={isDarkMode ? 'contained' : 'outlined'}
      uppercase={false}
      disabled={!request}
      theme={{ colors: { primary: 'red' } }}
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        width: '100%',
        maxWidth: 350,
        borderColor: primary,
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
      onPress={() => {
        promptAsync();
      }}
    >
      Continue with Google
    </Button>
  );
}
