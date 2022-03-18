import { createSlice } from '@reduxjs/toolkit';
import {
  doResetFilters,
  doSearchBarbers,
  doSetFilters,
  doSetSort,
} from './actions';

export interface SearchState {
  filters: { [key: string]: any };
  sort: 'Distance' | 'Price' | 'Rating';
}

const initialState: SearchState = {
  filters: {},
  sort: 'Distance',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doResetFilters, (state, _action) => {
      state.filters = initialState.filters;
    });
    builder.addCase(doSearchBarbers, (state, action) => {});
    builder.addCase(doSetFilters, (state, action) => {});
    builder.addCase(doSetSort, (state, action) => {
      state.sort = action.payload;
    });
    builder.addDefaultCase((state, _action) => state);
  },
});

export const { reducer: searchReducer } = searchSlice;
