import { VendorResponse, VendorSearchParams } from '../../types';
import { api } from './base.api';

const path = 'vendor';

const exampleVendors: VendorResponse[] = [
  {
    uid: '1',
    name: "Michael's Vintage Barber Shop",
    location: 'North Hills, NC',
    rating: '3.5',
    ratings: 123,
    latitude: 35.7796,
    longitude: -78.6382,
    cover: 'https://source.unsplash.com/featured?haircut,barber',
    images: [
      'https://source.unsplash.com/featured?haircut,barber',
      'https://source.unsplash.com/featured?barber,haircut',
      'https://source.unsplash.com/featured?scalp,shampoo',
      'https://source.unsplash.com/featured?scissor',
      'https://source.unsplash.com/featured?beard',
      'https://source.unsplash.com/featured?hair',
    ],
    avatar: 'https://source.unsplash.com/featured?haircut,barber',
  },
  {
    uid: '2',
    name: "Russel's Modern Barber Shop",
    location: 'Chapel Hill, NC',
    latitude: 35.9132,
    longitude: -79.0558,
    cover: 'https://source.unsplash.com/featured?barber',
    images: ['https://source.unsplash.com/featured?barber'],
  },
  {
    uid: '3',
    name: "Alfred's 90's Barber Shop",
    location: 'Cary, NC',
    latitude: 35.7915,
    longitude: -78.7811,
    cover: 'https://source.unsplash.com/featured?haircut',
    images: ['https://source.unsplash.com/featured?haircut'],
  },
  {
    uid: '4',
    name: 'Traditionals Barber Shop',
    location: 'Durham, NC',
    latitude: 35.994,
    longitude: -78.8986,
    cover: 'https://source.unsplash.com/featured?hair',
    images: ['https://source.unsplash.com/featured?hair'],
  },
  {
    uid: '5',
    name: 'Hecking Barber Shop',
    location: 'Wake Forest, NC',
    latitude: 35.9799,
    longitude: -78.5097,
    cover: 'https://source.unsplash.com/featured?shave',
    images: ['https://source.unsplash.com/featured?shave'],
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
      queryFn: (uid) => {
        const vendor = exampleVendors.find(
          (vendor) => vendor.uid === uid,
        );
        return vendor
          ? { data: vendor }
          : { error: { status: 404, data: undefined } };
      },
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
