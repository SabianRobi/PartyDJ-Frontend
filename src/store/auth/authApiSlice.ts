import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterData } from "../../views/auth/Register";
import { IUserResponse } from "../types";
import { LoginData } from "../../views/auth/Login";
import {
  IDeleteUserData,
  UpdateUserDetailsData,
  UpdateUserPasswordData,
} from "../../views/user/modalContents/ModalContent";
import { setUser } from "./authSlice";

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
    login: builder.mutation<IUserResponse, LoginData>({
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
      onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        // Save to redux store
        queryFulfilled.then((response) => {
          dispatch(setUser(response.data));
        });
      },
    }),
    logout: builder.mutation<null, null>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUserByUsername: builder.query<IUserResponse, string>({
      query: (username) => ({
        url: `/user/${username}`,
      }),
    }),
    updateUserDetails: builder.mutation<IUserResponse, UpdateUserDetailsData>({
      query: ({ currentUsername, data }) => ({
        url: `/user/${currentUsername}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        // Save to redux store
        queryFulfilled.then((response) => {
          dispatch(setUser(response.data));
        });
      },
    }),
    updateUserPassword: builder.mutation<IUserResponse, UpdateUserPasswordData>(
      {
        query: ({ currentUsername, data }) => ({
          url: `/user/${currentUsername}/password`,
          method: "PATCH",
          body: data,
        }),
        onQueryStarted(_arg, { queryFulfilled, dispatch }) {
          // Save to redux store
          queryFulfilled.then((response) => {
            dispatch(setUser(response.data));
          });
        },
      }
    ),
    deleteUser: builder.mutation<IUserResponse, IDeleteUserData>({
      query: ({ username, data }) => ({
        url: `/user/${username}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserDetailsMutation,
  useUpdateUserPasswordMutation,
  useDeleteUserMutation,
} = authApi;
