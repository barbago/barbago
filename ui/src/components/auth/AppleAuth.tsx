import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  isAvailableAsync,
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
} from 'expo-apple-authentication';
import { useAuth } from '../../providers';

export const AppleAuth = () => {
  const { signInApple } = useAuth();
  const [isAppleReady, setIsAppleReady] = useState(false);

  useEffect(() => {
    isAvailableAsync().then(setIsAppleReady);
  }, []);

  return (
    <>
      {isAppleReady ? (
        <AppleAuthenticationButton
          buttonStyle={AppleAuthenticationButtonStyle.WHITE}
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          cornerRadius={0}
          onPress={signInApple}
          style={{
            width: Dimensions.get('screen').width - 32,
            height: 50,
          }}
        />
      ) : null}
    </>
  );
};

// https://medium.com/nerd-for-tech/apple-google-authentication-in-expo-apps-using-firebase-997125440032
