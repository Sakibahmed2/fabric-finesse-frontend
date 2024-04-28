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
  }),
});

export const { useCreateReviewMutation } = reviewApi;
