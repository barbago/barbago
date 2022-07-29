import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { CustomLoader } from '../../components';

export const ChatListLoader = (props: ViewProps) => {
  const random = useMemo(() => Math.round(Math.random() * 3) + 3, []);

  return (
    <View style={{ padding: 16 }} {...props}>
      {[...Array(random).keys()].map((key) => (
        <CustomLoader
          key={key}
          width="100%"
          style={{ marginBottom: 16 }}
        />
      ))}
    </View>
  );
};
