import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/products",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllProducts: build.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useCreateProductMutation } = productsApi;
