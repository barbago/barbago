import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../../providers';

export interface SignInOutButtonProps {
  style?: ViewStyle;
}

export const SignInOutButton = ({ style }: SignInOutButtonProps) => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<any>();

  // https://reactnavigation.org/docs/nesting-navigators/
  // todo: route this to a login page
  const onPress = user ? signOut : () => navigation.replace('NotFound');
  const label = user ? 'Sign Out' : 'Sign In';
  return (
    <Button
      onPress={onPress}
      style={[{ alignSelf: 'flex-start' }, { ...style }]}
    >
      {label}
    </Button>
  );
};
