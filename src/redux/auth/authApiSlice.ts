import { RegisterData } from "#/pages/auth/Register";
import { UserResponse } from "#/redux/types";
import { LoginData } from "#/pages/auth/Login";
import {
  DeleteUserData,
  UpdateUserDetailsData,
  UpdateUserPasswordData,
} from "#/pages/user/modalContents/ModalContent";
import { apiSlice } from "#/redux/apiSlice";
import { setUser } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserResponse, RegisterData>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<UserResponse, LoginData>({
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
    getUserByUsername: builder.query<UserResponse, string>({
      query: (username) => ({
        url: `/user/${username}`,
      }),
    }),
    updateUserDetails: builder.mutation<UserResponse, UpdateUserDetailsData>({
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
    updateUserPassword: builder.mutation<UserResponse, UpdateUserPasswordData>(
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
    deleteUser: builder.mutation<UserResponse, DeleteUserData>({
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
