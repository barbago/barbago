import { api } from '.';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({ query: () => `/user` }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = userApi;
