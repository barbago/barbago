import React, { FC, forwardRef, Ref, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
} from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Screen } from '../../components';
import { windowWidth } from '../../config';
import { useThemeColor } from '../../hooks';
import { RootStackScreenProps } from '../../navigation/types';

const data: ImageSourcePropType[] = [
  require('../../assets/images/undraw_barber.png'),
  { uri: 'https://source.unsplash.com/featured?science' },
  { uri: 'https://source.unsplash.com/featured?technology' },
  { uri: 'https://source.unsplash.com/featured?engineering' },
  { uri: 'https://source.unsplash.com/featured?arts' },
  { uri: 'https://source.unsplash.com/featured?mathematics' },
];

interface SlideItem {
  item: ImageSourcePropType;
}

export function WelcomePage({
  navigation,
}: RootStackScreenProps<'Welcome'>) {
  const [index, setIndex] = useState(0);
  const progressValue = useSharedValue(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const renderItem = ({ item }: SlideItem) => (
    <Image source={item} style={StyleSheet.absoluteFill} />
  );

  const handleSlideChange = () => {
    setIndex(carouselRef.current?.getCurrentIndex() ?? 0);
  };

  const onDone = () => {
    navigation.push('Login');
  };

  const LeftButton = () => {
    const firstSlide = index < 1;
    return (
      <Button
        mode="outlined"
        style={styles.button}
        onPress={
          firstSlide ? onDone : () => carouselRef.current?.prev()
        }
      >
        {firstSlide ? 'Skip' : 'Prev'}
      </Button>
    );
  };

  const RightButton = () => {
    const lastSlide = index >= data.length - 1;
    return (
      <Button
        mode="contained"
        style={styles.button}
        onPress={lastSlide ? onDone : () => carouselRef.current?.next()}
      >
        {lastSlide ? 'Get Started' : 'Next'}
      </Button>
    );
  };

  return (
    <Screen style={{ position: 'relative' }}>
      <Carousel
        data={data}
        width={windowWidth}
        renderItem={renderItem}
        onSnapToItem={handleSlideChange}
        onProgressChange={(_offset, absolute) =>
          (progressValue.value = absolute)
        }
        ref={carouselRef}
        loop={false}
        pagingEnabled={true}
        windowSize={3}
      />
      <SafeAreaView
        style={[StyleSheet.absoluteFillObject, styles.controls]}
        pointerEvents="box-none"
        edges={['bottom']}
      >
        <View style={styles.pagination}>
          {data.map((value, index, arr) => (
            <PaginationItem
              index={index}
              animValue={progressValue}
              key={index}
              length={arr.length}
              scrollTo={(index: number) =>
                carouselRef.current?.scrollTo({ index, animated: true })
              }
            />
          ))}
        </View>
        <View style={styles.mainButtons}>
          <LeftButton />
          <RightButton />
        </View>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mainButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    margin: 8,
    flexBasis: '30%',
    flexGrow: 1,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
});

// https://github.com/dohooo/react-native-reanimated-carousel/blob/main/exampleExpo/src/parallax/index.tsx
const PaginationItem: FC<{
  index: number;
  length: number;
  animValue: SharedValue<number>;
  scrollTo: (index: number) => void;
}> = ({ animValue, index, length, scrollTo }) => {
  const color = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'tabIconDefault');
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <Pressable
      style={{
        backgroundColor,
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
      }}
      onPress={() => scrollTo(index)}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: color,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </Pressable>
  );
};
