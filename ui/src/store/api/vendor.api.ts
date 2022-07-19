import { VendorResponse, VendorSearchParams } from '../../types';
import { api } from './base.api';

const path = 'vendor';

export const vendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation<VendorResponse, VendorResponse>({
      query: (barber) => ({
        url: path,
        method: 'post',
        body: barber,
      }),
    }),
    fetchVendor: builder.query<VendorResponse, void>({
      query: () => ({ url: `${path}` }),
    }),
    fetchVendorById: builder.query<VendorResponse, string>({
      query: (uid) => ({ url: `${path}/${uid}` }),
    }),
    fetchVendorByLink: builder.query<VendorResponse, string>({
      query: (link) => ({ url: `${path}/link/${link}` }),
    }),
    vendorSearch: builder.query<VendorResponse[], VendorSearchParams>({
      query: (params) => ({
        url: `${path}/search`,
        method: 'post',
        body: params,
      }),
    }),
    updateVendor: builder.mutation<VendorResponse, any>({
      query: (body) => ({ url: path, method: 'put', body }),
    }),
    deleteVendor: builder.mutation<VendorResponse, void>({
      query: () => ({ url: path, method: 'delete' }),
    }),
  }),
  overrideExisting: false,
});
