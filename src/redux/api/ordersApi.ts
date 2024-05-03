import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),
    getUserOrder: build.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
    }),
    getAllOrders: build.query({
      query: () => ({
        url: "/orders",
      }),
    }),
    updateOrderStatus: build.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrderQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
