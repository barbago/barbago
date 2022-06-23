import React, { createContext, FC, useContext, useState } from 'react';

import { RootTabScreenProps } from '../../../navigation';
import { vendorApi } from '../../../store';
import { VendorResponse } from '../../../types';

export interface SearchState {
  query: ReturnType<typeof vendorApi.useLazyVendorSearchQuery>[0];
  vendors?: VendorResponse[];
  setSelected: (vendor?: VendorResponse) => void;
  selected?: VendorResponse;
  setSort: (sortBy?: string) => void;
  sort?: string;
  openVendor: (vendor: VendorResponse) => void;
}

export const SearchContext = createContext<SearchState>(undefined!);

export const useSearch = () => useContext(SearchContext);

export const SearchService: FC<RootTabScreenProps<'Search'>> = ({
  children,
  navigation,
  route,
}) => {
  const [query, { data: vendors }] =
    vendorApi.useLazyVendorSearchQuery();

  const [selected, setSelected] = useState<VendorResponse>();
  const [sort, setSort] = useState<string>();
  const [filters, setFilters] = useState<any>();

  const openVendor = (vendor: VendorResponse) => {
    navigation.push('Barber', { id: vendor.uid, screen: 'Info' });
  };

  const searchService = {
    query,
    vendors,
    openVendor,
    selected,
    setSelected,
    sort,
    setSort,
    filters,
    setFilters,
  };

  return (
    <SearchContext.Provider value={searchService}>
      {children}
    </SearchContext.Provider>
  );
};
