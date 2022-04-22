import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ToggleButton } from 'react-native-paper';

import { Text } from '../../components';

export interface CustomToggleButtonProps {
  value: string;
  icon?: keyof typeof MaterialIcon.glyphMap;
  style?: ViewStyle;
}

export const CustomToggleButton = ({
  value,
  icon,
  style,
}: CustomToggleButtonProps) => (
  <ToggleButton
    value={value}
    icon={generateToggleIcon(value, icon)}
    style={{
      flex: 1,
      paddingRight: 10,
      paddingLeft: 10,
      borderColor: undefined,
      borderRadius: undefined,
      ...style,
    }}
  />
);

export const generateToggleIcon =
  (text: String, icon?: keyof typeof MaterialIcon.glyphMap) => () =>
    (
      <View style={{ flexDirection: 'row' }}>
        {icon && (
          <MaterialIcon
            name={icon}
            // todo: make color adapt to color scheme
            color="white"
            size={20}
            style={{
              textAlign: 'center',
              marginRight: 5,
            }}
          />
        )}
        <Text>{text}</Text>
      </View>
    );
