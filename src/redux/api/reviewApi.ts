import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
    }),
    getReviewByProductId: build.query({
      query: (productId) => ({
        url: `/reviews/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewByProductIdQuery } =
  reviewApi;
