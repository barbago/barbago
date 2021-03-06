import React from 'react';
import { Screen, Text } from '../../../components';
import { SettingsStackScreenProps } from '../../../navigation';

export const PaymentInfoPage = ({
  navigation,
}: SettingsStackScreenProps<'Payment Details'>) => {
  return (
    <Screen scrolling>
      <Text>Payment Info</Text>
    </Screen>
  );
};
