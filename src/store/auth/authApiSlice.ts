import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterData } from "../../views/auth/Register";
import { IUserResponse } from "../types";
import { LoginData } from "../../views/auth/Login";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IUserResponse, RegisterData>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<null, LoginData>({
      query: (data) => {
        const bodyFormData = new FormData();
        bodyFormData.append("username", data.username);
        bodyFormData.append("password", data.password);

        return {
          url: "/login",
          method: "POST",
          body: bodyFormData,
        };
      },
    }),
    getUserByUsername: builder.query<IUserResponse, string>({
      query: (username) => ({
        url: `/user/${username}`,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyGetUserByUsernameQuery,
} = authApi;
