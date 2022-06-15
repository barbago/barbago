import React from 'react';
import { View } from 'react-native';
import { ProfileButtons, ProfileCaption, ProfileCarousel } from './';

export const ProfileHeader = () => {
  return (
    <View>
      <ProfileCarousel />
      <ProfileCaption />
      <ProfileButtons />
    </View>
  );
};
