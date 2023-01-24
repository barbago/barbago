import { auth } from '../../config';
import { api } from './base.api';

export interface UserResponse {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  photo?: string;
  pushToken?: string;
  registered?: boolean;
}

const userPath = 'users';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, void>({
      query: () => ({ url: userPath }),
      providesTags: (res) => [{ type: 'User', id: res?.uid }],
    }),
    isNewUser: builder.query<boolean, void>({
      queryFn: () => {
        const user = auth.currentUser;
        if (!user)
          return { error: { status: 401, data: 'Unauthorized' } };
        const { metadata } = user;
        if (!metadata) return { data: true };
        // https://stackoverflow.com/questions/39550149/
        const { lastSignInTime, creationTime } = metadata;
        return { data: creationTime === lastSignInTime };
      },
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
