import { api } from './base.api';

export interface UserResponse {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  photo?: string;
  pushTokens?: string[]
}

const userPath = 'users';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, void>({
      query: () => ({ url: userPath }),
    }),
    updateUser: builder.mutation<UserResponse, any>({
      query: () => ({ url: userPath, method: 'patch', body: {} }),
    }),
  }),
  overrideExisting: false,
});
