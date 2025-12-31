import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => {
        return {
          url: "/products",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllProducts: build.query({
      query: (query) => {
        console.log({ query });
        return {
          url: "/products",
          method: "GET",
          params: query,
        };
      },
    }),
  }),
});

export const { useGetAllProductsQuery, useCreateProductMutation } = productsApi;
