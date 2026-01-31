import { baseApi } from "./baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCoupon: build.mutation({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    getAllCoupons: build.query({
      query: (params) => ({
        url: "/coupons",
        method: "GET",
        params,
      }),
      providesTags: ["Coupon"],
    }),
    getCouponById: build.query({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),
    getCouponByCode: build.query({
      query: (code) => ({
        url: `/coupons/code/${code}`,
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),
    updateCoupon: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/coupons/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: build.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
    validateCoupon: build.mutation({
      query: (data) => ({
        url: "/coupons/validate",
        method: "POST",
        body: data,
      }),
    }),
    applyCoupon: build.mutation({
      query: (data) => ({
        url: "/coupons/apply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    getCouponStats: build.query({
      query: (id) => ({
        url: `/coupons/${id}/stats`,
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useGetCouponByIdQuery,
  useGetCouponByCodeQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useValidateCouponMutation,
  useApplyCouponMutation,
  useGetCouponStatsQuery,
} = couponApi;
