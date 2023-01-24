import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import {
  MainRoutes,
  RootRoutes,
  RootTabScreenProps,
} from '../../../navigation';
import { vendorApi } from '../../../store';
import { Coordinates, VendorResponse } from '../../../types';

export interface SearchState {
  query: ReturnType<typeof vendorApi.useLazyVendorSearchQuery>[0];
  // todo: figure out how to type this correctly
  response: any;
  vendors?: VendorResponse[];
  setSelected: (vendor?: VendorResponse) => void;
  selected?: VendorResponse;
  setSort: (sortBy?: string) => void;
  sort?: string;
  setCoords: (coords: Coordinates) => void;
  coords?: Coordinates;
  openVendor: (vendor: VendorResponse) => void;
}

export const SearchContext = createContext<SearchState>(undefined!);

export const useSearch = () => useContext(SearchContext);

export const SearchService: FC<
  PropsWithChildren & RootTabScreenProps<MainRoutes.Search>
> = ({ children, navigation, route }) => {
  const [query, response] = vendorApi.useLazyVendorSearchQuery();

  const [selected, setSelected] = useState<VendorResponse>();
  const [sort, setSort] = useState<string>();
  const [filters, setFilters] = useState<any>();
  const [coords, setCoords] = useState<Coordinates>();

  const openVendor = (vendor: VendorResponse) => {
    navigation.push(RootRoutes.Barber, { id: vendor.link });
  };

  const searchService = {
    query,
    response,
    vendors: response.data,
    openVendor,
    selected,
    setSelected,
    sort,
    setSort,
    filters,
    setFilters,
    coords,
    setCoords,
  };

  return (
    <SearchContext.Provider value={searchService}>
      {children}
    </SearchContext.Provider>
  );
};
