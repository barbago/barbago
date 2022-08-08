import { api } from './base.api';

export interface UserResponse {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  photo?: string;
  pushTokens?: string[];
}

const userPath = 'users';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, void>({
      query: () => ({ url: userPath }),
      providesTags: (res) => [{ type: 'User', id: res?.uid }],
    }),
    updateUser: builder.mutation<
      UserResponse,
      Pick<UserResponse, 'name' | 'phone' | 'photo'>
    >({
      query: (data) => ({ url: userPath, method: 'PATCH', body: data }),
      invalidatesTags: (res, _err) => [{ type: 'User', id: res?.uid }],
    }),
  }),
  overrideExisting: true,
});
