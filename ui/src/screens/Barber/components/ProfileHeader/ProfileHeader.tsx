import { View } from 'react-native';
import React, { useMemo } from 'react';
import { ProfileCarousel } from './ProfileCarousel';
import { ProfileButtons } from './ProfileButtons';
import { ProfileCaption } from './ProfileCaption';

export const ProfileHeader = () => {
  const urls = useMemo(
    () => [
      'https://source.unsplash.com/featured?chair,barber',
      'https://source.unsplash.com/featured?haircut,barber',
      'https://source.unsplash.com/featured?shave,haircut',
      'https://source.unsplash.com/featured?shave',
    ],
    [], // eventually set barber here idk
  );

  return (
    <View>
      <ProfileCarousel urls={urls} />
      <ProfileCaption />
      <ProfileButtons />
    </View>
  );
};
