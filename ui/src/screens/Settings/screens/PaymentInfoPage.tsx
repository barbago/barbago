import React from 'react';
import { Screen, Text } from '../../../components';
import { SettingsRoutes, SettingsStackScreenProps } from '../../../navigation/types';

export const PaymentInfoPage = ({
  navigation,
}: SettingsStackScreenProps<SettingsRoutes.Payment>) => {
  return (
    <Screen scrolling>
      <Text>Payment Info</Text>
    </Screen>
  );
};
