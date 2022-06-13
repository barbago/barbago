import { api } from './base.api';

export interface UserResponse {
  uid?: string;
  name?: string;
  email?: string;
}

const path = 'user';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<UserResponse, UserResponse>({
      query: () => ({ url: path, method: 'post' }),
    }),
    fetchUser: builder.query<UserResponse, void>({
      query: () => ({ url: path }),
    }),
    fetchUserById: builder.query<UserResponse, string>({
      query: (id) => ({
        url: `${path}/${id}`,
        method: 'get',
      }),
    }),
    fetchUsers: builder.query<UserResponse[], void>({
      query: () => ({ url: `${path}/all` }),
    }),
    updateUser: builder.mutation<UserResponse, any>({
      query: () => ({ url: path, method: 'put', body: {} }),
    }),
    updateUserById: builder.mutation<UserResponse, any>({
      query: (id) => ({
        url: `${path}/${id}`,
        method: 'put',
        body: {},
      }),
    }),
    deleteUser: builder.mutation<UserResponse, void>({
      query: () => ({ url: path, method: 'delete' }),
    }),
    deleteUserById: builder.mutation<UserResponse, string>({
      query: (id) => ({
        url: `${path}/${id}`,
        method: 'delete',
      }),
    }),
  }),
  overrideExisting: false,
});
