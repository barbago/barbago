import { Image, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { FAB, List, TouchableRipple } from 'react-native-paper';
import { useImage } from '../../hooks/useImage';
import { useUpload } from '../../hooks/useUpload';
import { auth } from '../../config';
import { uuidv4 } from '@firebase/util';
import { getDownloadURL } from 'firebase/storage';
import Animated from 'react-native-reanimated';

export type ImagePickerProps = UseControllerProps;

const size = 100;

// https://github.com/react-hook-form/react-hook-form/discussions/8097
// https://react-hook-form.com/api/usecontroller/
export const AvatarPicker = ({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
}: ImagePickerProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
  });

  const { uploadUri, isComplete, progress, error } = useUpload();

  const { assets, selectImage, removeImage } = useImage({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    onChange: async (assets) => {
      const uri = assets?.[0]?.uri;
      const uid = auth.currentUser?.uid;
      if (!uri || !uid) return;
      const refUrl = `users/${uid}/avatars/${uuidv4()}`;
      const uploadTask = await uploadUri(assets[0]?.uri, refUrl);
      const url = await getDownloadURL(uploadTask.ref);
      field.onChange(url);
      field.onBlur();
    },
  });

  const cancel = () => {
    removeImage();
    field.onChange(defaultValue);
  };

  const uri = useMemo(
    () =>
      assets?.[0]?.uri ??
      field.value ??
      require('../../assets/images/no_avatar.png'),
    [assets, field.value],
  );

  const imageSelected = useMemo(
    () => field.value !== defaultValue,
    [field.value, defaultValue],
  );

  return (
    <List.Item
      title="Profile Picture"
      description="Choose a new Profile Picture"
      onPress={imageSelected ? cancel : selectImage}
      style={styles.listItem}
      left={() => (
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: uri,
                width: size,
                height: size,
              }}
              style={styles.image}
            />
            <Animated.View
              style={[
                styles.overlay,
                {
                  width: `${progress * 100}%`,
                  opacity: !isComplete ? 1 : 0,
                },
              ]}
            ></Animated.View>
          </View>
          <FAB
            icon={imageSelected ? 'close' : 'camera'}
            size="small"
            style={styles.icon}
          ></FAB>
        </View>
      )}
    ></List.Item>
  );
};

const styles = StyleSheet.create({
  listItem: {
    margin: 16,
    marginTop: 0,
    padding: 0,
  },
  container: {
    position: 'relative',
    marginRight: 10,
    width: size,
    height: size,
  },
  icon: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  imageWrapper: {
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#88888888',
  },
});
