import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  isAvailableAsync,
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  signInAsync,
  AppleAuthenticationScope,
} from 'expo-apple-authentication';
import { CryptoDigestAlgorithm, digestStringAsync } from 'expo-crypto';
import { OAuthProvider } from 'firebase/auth';
import { signIn, store } from '../../store';

const signInApple = async () => {
  const nonce = Math.random().toString(36).substring(2, 10);
  const hashedNonce = await digestStringAsync(
    CryptoDigestAlgorithm.SHA256,
    nonce,
  );
  const appleCredential = await signInAsync({
    requestedScopes: [
      AppleAuthenticationScope.FULL_NAME,
      AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  });
  const { identityToken } = appleCredential;
  const provider = new OAuthProvider('apple.com');
  const oAuthCredential = provider.credential({
    idToken: identityToken!,
    rawNonce: nonce,
  });
  store.dispatch(signIn(oAuthCredential));
};


export const AppleAuth = () => {
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
