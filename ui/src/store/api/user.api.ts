import { api } from './base.api';

export interface UserResponse {
  uid?: string;
  name?: string;
  email?: string;
}

const userPath = 'users';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<UserResponse, UserResponse>({
      query: () => ({ url: userPath, method: 'post' }),
    }),
    fetchUser: builder.query<UserResponse, void>({
      query: () => ({ url: userPath }),
    }),
    fetchUserById: builder.query<UserResponse, string>({
      query: (id) => ({
        url: `${userPath}/${id}`,
        method: 'get',
      }),
    }),
    fetchUsers: builder.query<UserResponse[], void>({
      query: () => ({ url: `${userPath}/all` }),
    }),
    updateUser: builder.mutation<UserResponse, any>({
      query: () => ({ url: userPath, method: 'put', body: {} }),
    }),
    updateUserById: builder.mutation<UserResponse, any>({
      query: (id) => ({
        url: `${userPath}/${id}`,
        method: 'put',
        body: {},
      }),
    }),
    deleteUser: builder.mutation<UserResponse, void>({
      query: () => ({ url: userPath, method: 'delete' }),
    }),
    deleteUserById: builder.mutation<UserResponse, string>({
      query: (id) => ({
        url: `${userPath}/${id}`,
        method: 'delete',
      }),
    }),
  }),
  overrideExisting: false,
});
