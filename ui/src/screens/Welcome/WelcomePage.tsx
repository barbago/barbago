import React, { FC, useMemo, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Screen } from '../../components';
import { useThemeColor } from '../../hooks';
import { RootRoutes, RootStackScreenProps } from '../../navigation';
import { data, SlideItem } from './welcome-config';

export function WelcomePage({
  navigation,
}: RootStackScreenProps<RootRoutes.Welcome>) {
  const carouselRef = useRef<ICarouselInstance>(null);
  const progressValue = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const { bottom, top } = useSafeAreaInsets();
  let { width, height: winHeight } = useWindowDimensions();

  const height = useMemo(() => {
    const buttonOffset = 75;
    return winHeight - (bottom + top + buttonOffset);
  }, [winHeight, bottom, top]);

  const renderItem = ({ item }: { item: SlideItem }) => {
    const isScreenLarge = width > 900;
    const splitStyle = isScreenLarge
      ? { width: width / 2, height }
      : { width, height: height / 2 };
    return (
      <SafeAreaView
        style={{
          flexDirection: isScreenLarge ? 'row' : 'column',
          paddingBottom: 100,
        }}
      >
        <Image source={item.image} style={splitStyle} />
        <View style={[splitStyle, styles.slideText]}>
          <Title>{item.title}</Title>
          <Text>{item.text}</Text>
        </View>
      </SafeAreaView>
    );
  };

  const handleSlideChange = () => {
    setIndex(carouselRef.current?.getCurrentIndex() ?? 0);
  };

  const onDone = () => {
    navigation.navigate(RootRoutes.Main);
    navigation.push(RootRoutes.Login);
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
    <Screen>
      <Carousel
        data={data}
        width={width}
        renderItem={renderItem}
        onSnapToItem={handleSlideChange}
        onProgressChange={(_offset, absolute) =>
          (progressValue.value = absolute)
        }
        ref={carouselRef}
        loop={false}
        pagingEnabled={true}
      />
      <SafeAreaView
        style={[StyleSheet.absoluteFillObject, styles.controls]}
        pointerEvents="box-none"
      >
        <View style={styles.pagination}>
          {data.map((_value, index, array) => (
            <PaginationItem
              index={index}
              animValue={progressValue}
              key={index}
              length={array.length}
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
  },
  slideText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    textAlign: 'center',
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
        width,
        height: width,
        marginHorizontal: width / 2,
        backgroundColor,
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
