import React from 'react';
import { ProfileButtons, ProfileCaption, ProfileCarousel } from './';

export const ProfileHeader = () => {
  return (
    <>
      <ProfileCarousel />
      <ProfileCaption />
      <ProfileButtons />
    </>
  );
};
