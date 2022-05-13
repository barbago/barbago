import React, { memo, useCallback } from 'react';
import { Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { windowWidth } from '../../../config';

export const ProfileCarousel = memo(
  // using memo prevents rerender on tab change
  ({ urls }: { urls: string[] }) => {
    // https://dohooo.github.io/react-native-reanimated-carousel/

    const renderItem = useCallback(
      ({ item }: any) => (
        <Image
          source={{ uri: item }}
          style={{ width: '100%', height: '100%' }}
        />
      ),
      [],
    );

    return (
      <Carousel
        width={windowWidth < 900 ? windowWidth : windowWidth / 2}
        height={300}
        data={urls}
        style={{
          width: windowWidth,
        }}
        renderItem={renderItem}
      />
    );
  },
);
