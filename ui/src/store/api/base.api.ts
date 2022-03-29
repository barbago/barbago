import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../../config';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    token && headers.append('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
