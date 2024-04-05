import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterData } from "../../views/auth/Register";
import { IUserResponse } from "../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1" }),
  endpoints: (builder) => ({
    register: builder.mutation<IUserResponse, RegisterData>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),
    getUserByUsername: builder.query<IUserResponse, string>({
      query: (username) => `/user/${username}`,
    }),
  }),
});

export const { useGetUserByUsernameQuery, useRegisterMutation } = authApi;
