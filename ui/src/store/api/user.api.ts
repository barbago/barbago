import { api } from './base.api';

export interface UserResponse {
  uid?: string;
  name?: string;
  email?: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<UserResponse, UserResponse>({
      query: () => ({ url: `user`, method: 'post' }),
    }),
    fetchUser: builder.query<UserResponse, void>({
      query: () => ({ url: `user` }),
    }),
    fetchUserById: builder.query<UserResponse, string>({
      query: (id: string) => ({ url: `user/${id}`, method: 'get' }),
    }),
    fetchUsers: builder.query<UserResponse[], void>({
      query: () => ({ url: `user/all` }),
    }),
    updateUser: builder.mutation<UserResponse, any>({
      query: () => ({ url: `user`, method: 'put', body: {} }),
    }),
    updateUserById: builder.mutation<UserResponse, any>({
      query: (id: string) => ({
        url: `user/${id}`,
        method: 'put',
        body: {},
      }),
    }),
    deleteUser: builder.mutation<UserResponse, void>({
      query: () => ({ url: `user`, method: 'delete' }),
    }),
    deleteUserById: builder.mutation<UserResponse, string>({
      query: (id: string) => ({
        url: `user/${id}`,
        method: 'delete',
      }),
    }),
  }),
  overrideExisting: false,
});
