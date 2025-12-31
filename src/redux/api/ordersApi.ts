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
      query: (userId) => {
        return {
          url: `/orders/user/${userId}`,
          method: "GET",
        };
      },
    }),
    getAllOrders: build.query({
      query: (query) => ({
        url: "/orders",
        method: "GET",
        params: query,
      }),
    }),
    updateOrderStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
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
