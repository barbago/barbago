import React from 'react';
import { Screen } from '../../components';
import { RootTabScreenProps } from '../../navigation/types';
import { BarberResult } from '../../types';
import { Map } from './Map';
import { ResultModal } from './ResultModal';

const barbers: BarberResult[] = [
  {
    name: 'Giorgio',
    location: 'Merrick',
    cover: '',
  },
  {
    name: 'AAAa',
    location: 'AAAA',
    rating: '5.0 🌟',
    ratings: 10,
  },
  {
    name: 'AAAa',
    location: 'AAAA',
    rating: '5.0 🌟',
    ratings: 10,
  },
  {
    name: 'AAAa',
    location: 'AAAA',
    rating: '5.0 🌟',
    ratings: 10,
  },
];

export const SearchPage = ({
  navigation,
}: RootTabScreenProps<'Search'>) => {
  return (
    <Screen edges={['top']} scrolling={false}>
      <Map />
      <ResultModal barbers={barbers} />
    </Screen>
  );
};
