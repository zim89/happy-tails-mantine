// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const categoryApi = createApi({
//   reducerPath: 'categoryApi',
//   tagTypes: ['Categories'],
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://18.193.85.240:5000/',
//   }),
//   endpoints: (builder) => ({
//     findAll: builder.query({
//       query: ({ page, limit }) => `category?page=${page}&size=${limit}`,
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.content.map(({ id }) => ({ type: 'Categories', id })),
//               { type: 'Categories', id: 'LIST' },
//             ]
//           : [{ type: 'Categories', id: 'LIST' }],
//     }),
//     findOne: builder.query({
//       query: (id = 1) => `category/${id}`,
//     }),
// create: builder.mutation({
//   query(body) {
//     return {
//       url: 'products',
//       method: 'POST',
//       body,
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     };
//   },
//   invalidatesTags: [{ type: 'Products', id: 'LIST' }]
// }),
// update: builder.mutation({
//   query({body}) {
//     return {
//       url: `products`,
//       method: 'PUT',
//       body,
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     }
//   },
//   invalidatesTags: [{ type: 'Products', id: 'LIST' }]
// }),
// remove: builder.mutation({
//   query(id) {
//     return {
//       url: `products/${id}`,
//       method: 'DELETE',
//     }
//   },
//   invalidatesTags: [{ type: 'Products', id: 'LIST' }]
// }),
//   }),
// });
//
// export const {
//   useFindAllQuery,
//   useFindOneQuery,
// useCreateMutation,
// useUpdateMutation,
// useRemoveMutation,
// } = categoryApi;
