import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

import { Text } from './Text';

export interface ActionMessageProps {
  message?: string;
  actions?: {
    label: string;
    handler: (e: GestureResponderEvent) => void;
  }[];
}

/**
 * Creates a message with actions centered in the screen.
 */
export const ActionMessage = ({
  message: text,
  actions,
}: ActionMessageProps) => {
  return (
    <View style={styles.container}>
      {!!text && <Text>{text}</Text>}
      {!!actions && (
        <View style={{ flexDirection: 'row' }}>
          {actions.map(({ label, handler }, index) => (
            <Button onPress={handler} key={index}>
              {label}
            </Button>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
