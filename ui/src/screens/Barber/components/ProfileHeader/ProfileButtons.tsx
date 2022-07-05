import React, { useState } from 'react';
import { View, Share, StyleSheet } from 'react-native';
import { FAB, Menu } from 'react-native-paper';
import { useVendor } from '../../context';

export interface ProfileButtonsProps {
  horizontal?: boolean;
  gap?: number;
}

export const ProfileButtons = ({
  horizontal = false,
  gap = 8,
}: ProfileButtonsProps) => {
  const { vendor: barber } = useVendor();

  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const [favorite, setFavorite] = useState(false);

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
        color={favorite ? 'orange' : undefined}
        small
        // todo: decide how to save favorites
        onPress={() => setFavorite(!favorite)}
        style={styles.button}
      />

      <FAB
        icon="share"
        small
        onPress={() =>
          Share.share({
            message: `Check out ${barber?.name} on Barbago!`,
            url: `https://barbago.app/barber/${barber?.uid}`,
          })
        }
        style={styles.button}
      />
      <Menu
        anchor={
          <FAB
            small
            icon="dots-vertical"
            style={styles.button}
            onPress={openMenu}
          />
        }
        visible={menuOpen}
        onDismiss={closeMenu}
      >
        <Menu.Item
          icon="alert"
          title="Report Profile"
          // todo: open a separate reporting flow
          onPress={() => alert(`Reported ${barber?.name}'s profile`)}
        />
      </Menu>
    </View>
  );
};
