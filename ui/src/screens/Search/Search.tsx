import React from 'react';

import { RootTabScreenProps } from '../../navigation';
import { SearchPage } from './SearchPage';
import { SearchService } from './services';

export const Search = ({
  navigation,
  route,
}: RootTabScreenProps<'Search'>) => {
  return (
    <SearchService navigation={navigation} route={route}>
      <SearchPage />
    </SearchService>
  );
};
