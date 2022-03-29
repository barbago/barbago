import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://dev.api.barbago.app/',
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
