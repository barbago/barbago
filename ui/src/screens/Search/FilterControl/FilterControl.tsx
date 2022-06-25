import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
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
  const [focused, setFocused] = useState<boolean>(false);

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
      // does not work on android if geolocation refused, use api instead
      // https://developers.google.com/maps/documentation/javascript/geocoding
      reverseGeocodeAsync(coords)
        .then((res) => {
          setLocation(`${res[0].city}, ${res[0].region}` ?? ''),
            console.log(res);
        })
        .catch(console.error);
    }
  }, [coords]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Box style={styles.box}>
        <TextInput
          dense
          value={location}
          onChange={(e) => setLocation(e.nativeEvent.text)}
          onSubmitEditing={handleSubmit}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          placeholder="Raleigh, NC"
          selectionColor="red"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          clearButtonMode="while-editing"
          returnKeyType="search"
          autoComplete="street-address"
          textContentType="addressCity"
          selectTextOnFocus
          left={<TextInput.Icon name="map-marker" />}
          style={styles.input}
        />
        <Button>Filters</Button>
      </Box>
      {focused && (
        <Pressable
          style={styles.overlay}
          onPress={() => Keyboard.dismiss()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginHorizontal: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 500,
  },
  box: {
    margin: 10,
    paddingVertical: 8,
    paddingRight: 16,
    zIndex: 501,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#3337',
  },
});
