import React, { memo, useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { windowWidth } from '../../../../config';
import { useVendor } from '../../context';

// using memo prevents rerender on tab change
export const ProfileCarousel = memo(() => {
  const { vendor: barber } = useVendor();

  const urls = useMemo(() => barber?.images, [barber]);

  const renderItem = useCallback(
    ({ item }: any) => (
      <Image
        source={{ uri: item }}
        style={{ width: '100%', height: '100%' }}
      />
    ),
    [urls],
  );

  // https://dohooo.github.io/react-native-reanimated-carousel/
  return (
    <View>
      <Carousel
        width={windowWidth < 900 ? windowWidth : windowWidth / 2}
        height={300}
        data={urls!}
        style={{
          width: windowWidth,
        }}
        autoPlay
        autoPlayInterval={5000}
        renderItem={renderItem}
        windowSize={3}
      />
    </View>
  );
});
