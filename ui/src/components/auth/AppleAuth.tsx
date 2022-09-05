import React, { useEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
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
import { useColorScheme } from '../../hooks';
import { AuthButtonProps } from './AuthButton';

export const AppleAuth = ({ onAuthSuccess }: AuthButtonProps) => {
  const { signIn } = useAuth();
  const scheme = useColorScheme();

  const isDarkMode = useMemo(() => scheme === 'dark', [scheme]);

  const buttonStyle = useMemo(
    () =>
      isDarkMode
        ? AppleAuthenticationButtonStyle.WHITE
        : AppleAuthenticationButtonStyle.WHITE_OUTLINE,
    [isDarkMode],
  );

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
    await signIn(oAuthCredential).then(onAuthSuccess);
  };

  const [isAppleReady, setIsAppleReady] = useState(false);

  useEffect(() => {
    isAvailableAsync().then(setIsAppleReady);
  }, []);

  if (!isAppleReady) return null;

  return (
    <AppleAuthenticationButton
      buttonStyle={buttonStyle}
      buttonType={AppleAuthenticationButtonType.CONTINUE}
      cornerRadius={25}
      onPress={signInApple}
      style={{
        marginHorizontal: 16,
        marginVertical: 8,
        width: '100%',
        maxWidth: 350,
        alignSelf: 'center',
        height: 50,
      }}
    />
  );
};

// https://medium.com/nerd-for-tech/apple-google-authentication-in-expo-apps-using-firebase-997125440032
