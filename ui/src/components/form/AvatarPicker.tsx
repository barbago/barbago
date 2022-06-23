import React, { useState } from 'react';
import { Image } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';

export const AvatarPicker = () => {
  const [image, setImage] = useState<string>();
  const openImagePickerAsync = async () => {
    const permission = await requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert('Permission to camera roll is required to upload a photo!');
      return;
    }
    let result = await launchImageLibraryAsync({});
    if (!result.cancelled) setImage(result.uri);
  };

  return (
    <List.Item
      title="Profile Picture"
      description="Choose a new photo to display"
      left={() => (
        <Avatar.Image
          size={64}
          source={(props) => (
            <Image
              source={{ uri: image ?? '' }}
              style={{
                height: 64,
                width: 64,
                maxHeight: 64,
                maxWidth: 64,
                backgroundColor: '#777',
              }}
              resizeMode="center"
            />
          )}
        />
      )}
      onPress={openImagePickerAsync}
    />
  );
};
