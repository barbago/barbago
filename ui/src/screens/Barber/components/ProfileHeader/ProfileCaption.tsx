import { Text, View, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { VendorContext } from '../../context';

export const ProfileCaption = () => {
  const { vendor: barber } = useContext(VendorContext);

  return (
    <View style={styles.container} pointerEvents="none">
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      />

      <Text style={styles.title}>{barber?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: '125%',
  },
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: 16,
  },
  title: {
    position: 'relative',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
