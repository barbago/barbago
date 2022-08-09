import { VendorResponse, VendorSearchParams } from '../../types';
import { api } from './base.api';

export const vendorPath = 'vendors';

export const vendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation<VendorResponse, VendorResponse>({
      query: (barber) => ({
        url: vendorPath,
        method: 'POST',
        body: barber,
      }),
      invalidatesTags: ['Vendor'],
    }),
    fetchVendor: builder.query<VendorResponse, void>({
      query: () => ({ url: `${vendorPath}` }),
      providesTags: ['Vendor'],
    }),
    fetchVendorById: builder.query<VendorResponse, string>({
      query: (uid) => ({ url: `${vendorPath}/${uid}` }),
      providesTags: (_res, _err, arg) => [{ type: 'Vendor', id: arg }],
    }),
    fetchVendorByLink: builder.query<VendorResponse, string>({
      query: (link) => ({ url: `${vendorPath}/link/${link}` }),
      providesTags: (res, _err, _arg) => [
        { type: 'Vendor', id: res?.uid },
      ],
    }),
    vendorSearch: builder.query<VendorResponse[], VendorSearchParams>({
      query: (params) => ({
        url: `${vendorPath}/search`,
        method: 'POST',
        body: params,
      }),
      providesTags: ['Vendor'],
    }),
    updateVendor: builder.mutation<VendorResponse, any>({
      query: (body) => ({ url: vendorPath, method: 'PATCH', body }),
      invalidatesTags: ['Vendor'],
    }),
    deleteVendor: builder.mutation<VendorResponse, void>({
      query: () => ({ url: vendorPath, method: 'DELETE' }),
      invalidatesTags: ['Vendor'],
    }),
  }),
  overrideExisting: true,
});
