import React from 'react';
import { Box } from '../../../components';
import { windowHeight } from '../../../config';

export const TabScreen: React.FC = ({ children }) => {
  return (
    <Box
      // height: 100% doesn't work here for some reason
      // 112 is the height of the navbar + tabbar
      style={{ minHeight: windowHeight - 112 }}
      // onTouchMove={() => alert('MOVED')} todo: use this to figure out how to change scroll
      // https://snack.expo.dev/@julianheckerdev/ce721a reference this to find out how to fix scroll
      // another fix would be for the vendorTabs component to have the same height as its tallest child
    >
      {children}
    </Box>
  );
};
