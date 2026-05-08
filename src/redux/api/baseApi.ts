import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fabric-finesse-backend-v2.onrender.com/api/v1",
    // baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: () => ({}),
  tagTypes: ["Product", "Category", "Order", "User", "Coupon"],
});
