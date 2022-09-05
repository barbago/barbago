import { ResponseType } from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/providers/facebook';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { FacebookAuthProvider } from 'firebase/auth';
import React, { useEffect, useMemo } from 'react';
import { Button } from 'react-native-paper';
import { facebookConfig } from '../../config';
import { useColorScheme } from '../../hooks';
import { useAuth } from '../../providers';
import { AuthButtonProps } from './AuthButton';

maybeCompleteAuthSession();

const signInFacebook = (access_token: string) => {
  return FacebookAuthProvider.credential(access_token);
};

export const FacebookAuth = ({ onAuthSuccess }: AuthButtonProps) => {
  const { signIn } = useAuth();
  const scheme = useColorScheme();
  const primary = '#4267B2';

  const isDarkMode = useMemo(() => scheme === 'dark', [scheme]);

  const [request, response, promptAsync] = useAuthRequest({
    responseType: ResponseType.Token,
    clientId: facebookConfig.clientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      const credential = signInFacebook(access_token);
      signIn(credential).then(onAuthSuccess);
    }
  }, [response]);

  return (
    <Button
      icon="facebook"
      mode={isDarkMode ? 'contained' : 'outlined'}
      uppercase={false}
      disabled={!request}
      theme={{ colors: { primary: '#4267B2' } }}
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
      Continue with Facebook
    </Button>
  );
};

// https://docs.expo.io/guides/authentication/#facebook
// https://developers.facebook.com/apps/3025265811132416/fb-login/settings/
// https://derk-jan.com/2020/05/expo-facebook-login/
