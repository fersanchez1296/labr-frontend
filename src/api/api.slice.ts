import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reserva-laboratorios-production.up.railway.app/'
  }),
  tagTypes: ['Users','Labs'],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (endpoint) => {
        return {
          url: `${endpoint}`,
          method: 'GET',
        };
      },
      providesTags: ['Users','Labs'],
    }),
    getSingle: builder.query({
      query: ({endpoint,id}) => {
        return {
          url: `${endpoint}?search=${id}`,
          method: 'GET',
        };
      },
      providesTags: ['Users'],
    }),
    updateQuery: builder.mutation({
      query: (user) => ({
        url: `adminUser-update/${user.codigo}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['Users'], // Invalida la caché de 'Users' después de realizar el PUT
    }),
    deleteQuery: builder.mutation({
      query: ({ endpoint, Id }) => ({
        url: `${endpoint}/${Id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'], // Invalidates the 'Users' cache after performing the DELETE
    }),
    newQuery: builder.mutation({
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
  useGetAllQuery,
  useGetSingleQuery,
  useNewQueryMutation,
  useUpdateQueryMutation,
  useDeleteQueryMutation,
  useGetLabsQuery,
  useGetSubjectsQuery,
  useGetPracticesQuery,
  useGetToolsQuery,
  useGetReservationsQuery,
  
} = apiSlice;

