import React, { useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import {
  geocodeAsync,
  reverseGeocodeAsync,
  setGoogleApiKey,
} from 'expo-location';

import { useSearch } from '../services';
import { googleConfig } from '../../../config';
import { Box } from '../../../components';

export const FilterControl = () => {
  const { coords, setCoords } = useSearch();
  const [location, setLocation] = useState<string>('');

  const handleSubmit = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    try {
      const coords = await geocodeAsync(e.nativeEvent.text);
      console.log(coords);
      setCoords(coords[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (coords) {
      setGoogleApiKey(googleConfig.geocodingKey);
      reverseGeocodeAsync(coords)
        .then((res) => {
          setLocation(`${res[0].city}, ${res[0].region}` ?? ''),
            console.log(res);
        })
        .catch(console.error);
    }
  }, [coords]);

  return (
    <Box style={styles.container}>
      <TextInput
        dense
        value={location}
        onChange={(e) => setLocation(e.nativeEvent.text)}
        onSubmitEditing={handleSubmit}
        placeholder="Input any place"
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        autoComplete="street-address"
        left={<TextInput.Icon name="map-marker" />}
        style={styles.input}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    left: 10,
    marginHorizontal: 'auto',
    paddingVertical: 8,
    paddingRight: 16,
    zIndex: 500,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
