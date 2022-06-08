import { View, Share, StyleSheet } from 'react-native';
import React from 'react';
import { FAB } from 'react-native-paper';

export interface ProfileButtonsProps {
  horizontal?: boolean;
  gap?: number;
}

export const ProfileButtons = ({
  horizontal = false,
  gap = 8,
}: ProfileButtonsProps) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: horizontal ? 'row' : 'column-reverse',
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 16,
      paddingHorizontal: horizontal ? gap / -2 : undefined,
      paddingVertical: !horizontal ? gap / -2 : undefined,
    },
    button: {
      marginHorizontal: horizontal ? gap / 2 : undefined,
      marginVertical: !horizontal ? gap / 2 : undefined,
    },
  });

  return (
    <View style={styles.container}>
      <FAB
        icon="star"
        color={'orange'}
        small
        onPress={() => alert('PRESSEd')}
        style={styles.button}
      />

      <FAB
        icon="share"
        small
        onPress={() =>
          Share.share(
            {
              message: 'Heck yeah',
              title: 'sharing is caring',
              url: 'https://barbago.app',
            },
            {
              tintColor: 'green',
            },
          )
        }
        style={styles.button}
      />
      <FAB
        icon="dots-vertical"
        small
        onPress={() => alert('PRESSEd')}
        style={styles.button}
      />
    </View>
  );
};
