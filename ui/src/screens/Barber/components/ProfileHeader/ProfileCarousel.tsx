import React, { memo, useCallback, useMemo } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useVendor } from '../../context';

// using memo prevents rerender on tab change
export const ProfileCarousel = memo(() => {
  const { vendor: barber } = useVendor();
  const { width, height } = useWindowDimensions();

  const urls = useMemo(() => barber?.images, [barber]);

  const renderItem = useCallback(
    ({ item }: any) => (
      <Image source={{ uri: item }} style={{ width, height }} />
    ),
    [urls],
  );

  // https://dohooo.github.io/react-native-reanimated-carousel/
  return (
    <View>
      <Carousel
        width={width < 900 ? width : width / 2}
        height={300}
        data={urls!}
        style={{ width }}
        autoPlay
        autoPlayInterval={5000}
        renderItem={renderItem}
        windowSize={3}
      />
    </View>
  );
});
