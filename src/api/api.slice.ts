import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
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
      query: ({endpoint,values}) => ({
        url: `${endpoint}/${values.codigo || values.id || values.crn}`,
        method: 'PUT',
        body: values,
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
      query: ({endpoint, values}) => ({
        url: `${endpoint}`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Users'], // Invalida la caché de 'Users' después de realizar el POST
    }),
    specialData: builder.mutation({
      query: ({endpoint,codigo}) => {
        return {
          url: `${endpoint}`,
          method: 'POST',
          body: {codigo}
        };
      },
      invalidatesTags: ['Users'],
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
  useSpecialDataMutation
} = apiSlice;

