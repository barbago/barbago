import { VendorResponse, VendorSearchParams } from '../../types';
import { api } from './base.api';

export const vendorPath = 'vendors';

export const vendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation<VendorResponse, VendorResponse>({
      query: (barber) => ({
        url: vendorPath,
        method: 'post',
        body: barber,
      }),
    }),
    fetchVendor: builder.query<VendorResponse, void>({
      query: () => ({ url: `${vendorPath}` }),
    }),
    fetchVendorById: builder.query<VendorResponse, string>({
      query: (uid) => ({ url: `${vendorPath}/${uid}` }),
    }),
    fetchVendorByLink: builder.query<VendorResponse, string>({
      query: (link) => ({ url: `${vendorPath}/link/${link}` }),
    }),
    vendorSearch: builder.query<VendorResponse[], VendorSearchParams>({
      query: (params) => ({
        url: `${vendorPath}/search`,
        method: 'post',
        body: params,
      }),
    }),
    updateVendor: builder.mutation<VendorResponse, any>({
      query: (body) => ({ url: vendorPath, method: 'put', body }),
    }),
    deleteVendor: builder.mutation<VendorResponse, void>({
      query: () => ({ url: vendorPath, method: 'delete' }),
    }),
  }),
  overrideExisting: false,
});
