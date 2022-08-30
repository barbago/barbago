import { ResponseType } from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/providers/facebook';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { FacebookAuthProvider } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { facebookConfig } from '../../config';
import { useAuth } from '../../providers';

maybeCompleteAuthSession();

const signInFacebook = (access_token: string) => {
  return FacebookAuthProvider.credential(access_token);
};

export const FacebookAuth = () => {
  const { signIn } = useAuth();

  const [request, response, promptAsync] = useAuthRequest({
    responseType: ResponseType.Token,
    clientId: facebookConfig.clientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      const credential = signInFacebook(access_token);
      signIn(credential);
    }
  }, [response]);

  return (
    <Button
      icon="facebook"
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
    >
      Sign in with Facebook
    </Button>
  );
};

// https://docs.expo.io/guides/authentication/#facebook
// https://developers.facebook.com/apps/3025265811132416/fb-login/settings/
// https://derk-jan.com/2020/05/expo-facebook-login/
