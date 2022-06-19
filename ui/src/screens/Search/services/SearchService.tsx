import { createContext, FC, useContext } from 'react';

export interface ISearchService {}

export class SearchService implements ISearchService {}

export const SearchContext = createContext<ISearchService>({});

export const SearchProvider: FC = ({ children }) => (
  <SearchContext.Provider value={SearchService}>
    {children}
  </SearchContext.Provider>
);

export const useSearch = () => useContext(SearchContext);

// todo: remove, but refer to it first
