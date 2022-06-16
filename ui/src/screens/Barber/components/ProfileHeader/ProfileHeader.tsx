import React from 'react';
import { View } from 'react-native';

import { ProfileButtons } from './ProfileButtons';
import { ProfileCaption } from './ProfileCaption';
import { ProfileCarousel } from './ProfileCarousel';

export const ProfileHeader = () => {
  return (
    <View>
      <ProfileCarousel />
      <ProfileCaption />
      <ProfileButtons />
    </View>
  );
};
