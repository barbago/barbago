import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { apiUrl, auth } from '../../config';

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: async (headers /*, { getState }*/) => {
    const token = await auth.currentUser?.getIdToken();
    // const token = (getState() as RootState).auth.token;
    token && headers.append('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Vendor', 'Review'],
});
