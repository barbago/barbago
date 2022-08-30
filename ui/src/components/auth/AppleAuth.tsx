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
import { useAuth } from '../../providers';

export const AppleAuth = () => {
  const { signIn } = useAuth();

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
    await signIn(oAuthCredential);
  };

  const [isAppleReady, setIsAppleReady] = useState(false);

  useEffect(() => {
    isAvailableAsync().then(setIsAppleReady);
  }, []);

  if (!isAppleReady) return null;

  return (
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
  );
};

// https://medium.com/nerd-for-tech/apple-google-authentication-in-expo-apps-using-firebase-997125440032
