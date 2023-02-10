import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppUser } from '@src/typings';

const adminApi = createApi({
  reducerPath: 'adminApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getUser: builder.query<AppUser, string>({
      query: (id: string) => `/user/${id}`,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  reducerPath: adminReducerPath,
  reducer: adminReducer,
  middleware: adminMiddleware,
} = adminApi;
