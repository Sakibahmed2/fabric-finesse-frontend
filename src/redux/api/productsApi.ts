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
      invalidatesTags: ["Product"],
    }),
    getAllProducts: build.query({
      query: (query) => {
        return {
          url: "/products",
          method: "GET",
          params: query,
        };
      },
      providesTags: ["Product"],
    }),
    getProductById: build.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    updateProduct: build.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
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
