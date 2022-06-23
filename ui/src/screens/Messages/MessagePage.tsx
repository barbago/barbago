import React from 'react';
import { Avatar, List, Text } from 'react-native-paper';
import { Screen } from '../../components';
import { RootTabScreenProps } from '../../navigation/types';
import { useAuth } from '../../hooks';

export const MessagePage: React.FC<RootTabScreenProps<'Messages'>> = ({
  navigation,
  children,
}) => {
  const { user } = useAuth();
  return (
    <Screen scrolling>
      <List.Item
        title="Giovanni Georgio"
        description="Hey so we're still on for next week right?"
        left={(props) => <Avatar.Text label="GG" {...props} />}
        right={() => <Text>12/31/2021</Text>}
      />
    </Screen>
  );
};

/**
 * What is the messaging API going to look like?
 *
 */
