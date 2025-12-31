import { baseApi } from "./baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategories: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/categories",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllCategories: build.query({
      query: () => ({
        url: "/categories",
        method: "GET",
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
  }),
});

export const {
  useCreateCategoriesMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} = categoriesApi;
