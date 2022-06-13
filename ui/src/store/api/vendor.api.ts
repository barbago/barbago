import { VendorResponse, VendorSearchParams } from '../../types';
import { api } from './base.api';

const path = 'vendor';

const exampleVendors: VendorResponse[] = [
  {
    uid: '1',
    name: "Michael's Vintage Barber Shop",
    location: 'North Hills',
    cover: 'https://source.unsplash.com/featured?haircut,barber',
    latitude: 35.7796,
    longitude: -78.6382,
  },
  {
    uid: '2',
    name: "Russel's Modern Barber Shop",
    location: 'Wake Forest',
    cover: 'https://source.unsplash.com/featured?barber',
  },
  {
    uid: '3',
    name: "Alfred's 90's Barber Shop",
    cover: 'https://source.unsplash.com/featured?haircut',
  },
  {
    uid: '4',
    name: 'Traditionals Barber Shop',
    cover: 'https://source.unsplash.com/featured?hair',
  },
  {
    uid: '5',
    name: 'Hecking Barber Shop',
    cover: 'https://source.unsplash.com/featured?shave',
  },
];

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
      queryFn: (uid) => ({
        data:
          exampleVendors.find((vendor) => vendor.uid === uid) ?? {},
      }),
    }),
    fetchVendors: builder.query<VendorResponse[], void>({
      query: () => ({
        url: `${path}/all`,
      }),
    }),
    vendorSearch: builder.query<VendorResponse[], VendorSearchParams>(
      {
        queryFn: (_) => ({
          data: exampleVendors,
        }),
      },
    ),
    updateVendor: builder.mutation<VendorResponse, any>({
      query: (body) => ({ url: path, method: 'put', body }),
    }),
    updateVendorById: builder.mutation<VendorResponse, any>({
      query: (params) => ({
        url: `${path}/${params.uid}`,
        method: 'put',
        body: { ...params },
      }),
    }),
    deleteVendor: builder.mutation<VendorResponse, void>({
      query: () => ({ url: path, method: 'delete' }),
    }),
    deleteVendorById: builder.mutation<VendorResponse, string>({
      query: (uid) => ({ url: `${path}/${uid}`, method: 'delete' }),
    }),
  }),
  overrideExisting: false,
});
