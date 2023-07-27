import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reserva-laboratorios-production.up.railway.app/'
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: 'adminTeacher',
          method: 'GET',
        };
      },
      providesTags: ['Users'],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: 'adminTeacher',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'], // Invalida la caché de 'Users' después de realizar el POST
    }),
    getLabs: builder.query({
      query: () => {
        return {
          url: 'adminLabs',
          method: 'GET',
        };
      },
    }),
    getSubjects: builder.query({
      query: () => {
        return {
          url: 'adminSubjects',
          method: 'GET',
        };
      },
    }),
    getPractices: builder.query({
      query: () => {
        return {
          url: 'adminPractices',
          method: 'GET',
        };
      },
    }),
    getTools: builder.query({
      query: () => {
        return {
          url: 'adminTools',
          method: 'GET',
        };
      },
    }),
    getReservations: builder.query({
      query: () => {
        return {
          url: 'adminReservations',
          method: 'GET',
        };
      },
    }),
  }),
  keepUnusedDataFor: 300,
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetLabsQuery,
  useGetSubjectsQuery,
  useGetPracticesQuery,
  useGetToolsQuery,
  useGetReservationsQuery,
} = apiSlice;

