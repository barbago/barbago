import React from 'react';
import { Pressable, TextStyle, View, ViewStyle } from 'react-native';

import { Text } from '../../../../components';

export interface StarsProps {
  /** Number of stars to highlight. */
  rating?: number;
  /** Optional method to change the number of stars */
  setRating?: (rating: number) => void;
  /** If disabled, setRating will not be called */
  disabled?: boolean;
  /** Max number of stars to display. Defaults to 5 */
  maxStars?: number;
  /** Sets the style of the view containing the stars */
  style?: ViewStyle;
  /** Set the style of all the stars */
  starStyle?: TextStyle;
  /** Set the style of the active stars */
  goldStarStyle?: TextStyle;
  /** Set the style of the inactive stars */
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
