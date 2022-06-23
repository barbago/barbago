import { createAction } from '@reduxjs/toolkit';

export const doSetFilters = createAction('search/setFilters');

export const doResetFilters = createAction('search/resetFilters');

export const doSetSort = createAction<'Distance' | 'Price' | 'Rating'>(
  'search/setSort',
);

export const doSearchBarbers = createAction('search/getBarbers');
