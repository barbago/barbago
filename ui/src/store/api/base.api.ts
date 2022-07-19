import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { apiUrl, auth } from '../../config';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers, { getState }) => {
    auth.currentUser?.getIdToken();
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
