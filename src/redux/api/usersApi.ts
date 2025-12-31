import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
