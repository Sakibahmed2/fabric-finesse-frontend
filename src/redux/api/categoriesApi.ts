import { baseApi } from "./baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategories: build.mutation({
      query: (data) => {
        return {
          url: "/categories",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllCategories: build.query({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params,
      }),
    }),
    getSingleCategory: build.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
    }),
    updateCategory: build.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/categories/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoriesMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
