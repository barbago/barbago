import { createContext } from 'react';
import { VendorResponse } from '../../../types';

export interface SearchState {
  vendors?: VendorResponse[];
}

export const SearchContext = createContext<SearchState>({});
