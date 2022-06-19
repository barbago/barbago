import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  requestForegroundPermissionsAsync,
} from 'expo-location';

import { Screen } from '../../components';
import { RootTabScreenProps } from '../../navigation/types';
import { vendorApi } from '../../store';
import { VendorResponse } from '../../types';
import { Map } from './Map';
import { ResultModal } from './ResultModal';


export function SearchService() {



  
}


export interface SearchState {
  vendors?: VendorResponse[];
  openVendor: (vendor: VendorResponse) => void;
  setSelected: (vendor?: VendorResponse) => void;
  selected?: VendorResponse;
  setSort: (sortBy?: string) => void;
  sort?: string;
}

export const SearchContext = createContext<SearchState>(undefined!);

export const SearchProvider: FC = ({ children }) => (
  <SearchContext.Provider value={undefined!}>
    {children}
  </SearchContext.Provider>
);

export const useSearch = () => useContext(SearchContext);

export const SearchPage = ({
  navigation,
}: RootTabScreenProps<'Search'>) => {
  const { data: vendors } = vendorApi.useVendorSearchQuery({});

  const [selected, setSelected] = useState<VendorResponse>();
  const [sort, setSort] = useState<string>();

  const setFilter = () => {};

  const openVendor = (vendor: VendorResponse) => {
    // refactor vendor model, edit required fields
    navigation.push('Barber', { id: vendor.uid, screen: 'Info' });
  };

  useEffect(() => {
    (async () => {
      // If I don't have the geolocation yet, zoom to the entire US until they enter a location or geolocation loads
      let { status } = await requestForegroundPermissionsAsync();
      let { coords } = await getCurrentPositionAsync({
        // using balanced accuracy means the location is loaded
        // almost immediately as soon as user allows it
        accuracy: LocationAccuracy.Balanced,
      });
      console.log(coords);
      // alert(`${coords.latitude}, ${coords.longitude}`);
    })();
  }, []);

  const searchService = {
    vendors,
    openVendor,
    selected,
    setSelected,
    setSort,
    sort,
  };

  return (
    <SearchContext.Provider value={searchService}>
      <Screen edges={['top']}>
        <Map />
        <ResultModal />
      </Screen>
    </SearchContext.Provider>
  );
};
