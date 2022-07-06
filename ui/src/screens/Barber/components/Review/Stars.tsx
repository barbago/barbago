import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import { Text } from '../../../../components';

export interface StarsProps {
  rating: number;
  maxStars?: number;
  style?: ViewStyle;
  starStyle?: TextStyle;
  goldStarStyle?: TextStyle;
  greyStarStyle?: TextStyle;
}

export const Stars = ({
  rating,
  maxStars = 5,
  goldStarStyle = { color: 'gold' },
  greyStarStyle = { opacity: 0.5 },
  style,
  starStyle = { fontSize: 20, lineHeight: 20 },
}: StarsProps) => {
  // todo: update this so that half stars can render
  // possibly render all 5 empty stars, and full stars on top
  // and a fraction of the last star
  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
      {[...Array(maxStars).keys()].map((i) =>
        i < Math.round(rating) ? (
          <Text key={i} style={[starStyle, goldStarStyle]}>
            ★
          </Text>
        ) : (
          <Text key={i} style={[starStyle, greyStarStyle]}>
            ★
          </Text>
        ),
      )}
    </View>
  );
};
