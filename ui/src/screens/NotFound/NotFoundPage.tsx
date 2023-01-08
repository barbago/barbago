import * as React from 'react';
import { Button } from 'react-native-paper';
import { Screen, Text } from '../../components';

import {
  RootRoutes,
  RootStackScreenProps,
} from '../../navigation/types';

export function NotFoundScreen({
  navigation,
}: RootStackScreenProps<RootRoutes.NotFound>) {
  return (
    <Screen
      style={{
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Text style={{ marginHorizontal: 'auto', marginBottom: 20 }}>
        Oops, There was an error! Try again later.
      </Text>
      <Button onPress={() => navigation.replace(RootRoutes.Main)}>
        Go Home
      </Button>
      {navigation.canGoBack() && (
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      )}
    </Screen>
  );
}
