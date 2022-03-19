import { ResponseType } from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/providers/facebook';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { facebookConfig } from '../../config';
import { useAuth } from '../../hooks';

maybeCompleteAuthSession();

export const FacebookAuth = () => {
  const { signInFacebook } = useAuth();
  const [request, response, promptAsync] = useAuthRequest({
    responseType: ResponseType.Token,
    clientId: facebookConfig.clientId
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      signInFacebook(access_token);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
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
