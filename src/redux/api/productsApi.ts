import { get } from "http";
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
        return {
          url: "/products",
          method: "GET",
          params: query,
        };
      },
    }),
    getProductById: build.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
    }),
    updateProduct: build.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    deleteProduct: build.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} = productsApi;
