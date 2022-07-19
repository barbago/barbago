import React from 'react';
import { Pressable, TextStyle, View, ViewStyle } from 'react-native';

import { Text } from '../../../../components';

export interface StarsProps {
  rating?: number;
  setRating?: (rating: number) => void;
  disabled?: boolean;
  maxStars?: number;
  style?: ViewStyle;
  starStyle?: TextStyle;
  goldStarStyle?: TextStyle;
  greyStarStyle?: TextStyle;
}

export const Stars = ({
  rating = 0,
  setRating,
  maxStars = 5,
  disabled = false,
  goldStarStyle = { color: 'gold' },
  greyStarStyle = { opacity: 0.5 },
  style,
  starStyle = { fontSize: 20, lineHeight: 20 },
}: StarsProps) => {
  // todo: update this so that half stars can render
  // possibly render all 5 empty stars, and full stars on top
  // and a fraction of the last star
  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      {[...Array(maxStars).keys()].map((i) => (
        <Pressable
          onPress={() => !disabled && setRating?.(i + 1)}
          key={i}
        >
          {i < Math.round(rating) ? (
            <Text style={[starStyle, goldStarStyle]}>★</Text>
          ) : (
            <Text style={[starStyle, greyStarStyle]}>★</Text>
          )}
        </Pressable>
      ))}
    </View>
  );
};
