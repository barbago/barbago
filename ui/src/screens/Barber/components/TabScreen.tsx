import React from 'react';
import { View } from '../../../components';
import { windowHeight } from '../../../config';

export const TabScreen: React.FC = ({ children }) => {
  return (
    <View
      // height: 100% doesn't work here for some reason
      // 112 is the height of the navbar + tabbar
      style={{ minHeight: windowHeight - 112 }}
    >
      {children}
    </View>
  );
};
