import React from 'react';

import { MainRoutes, RootTabScreenProps } from '../../navigation/types';
import { SearchPage } from './SearchPage';
import { SearchService } from './services';

export const Search = ({
  navigation,
  route,
}: RootTabScreenProps<MainRoutes.Search>) => {
  return (
    <SearchService navigation={navigation} route={route}>
      <SearchPage />
    </SearchService>
  );
};
