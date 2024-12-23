import { type LoginData } from "#/pages/auth/Login";
import { type RegisterData } from "#/pages/auth/Register";
import {
  type DeleteUserData,
  type UpdateUserDetailsData,
  type UpdateUserPasswordData
} from "#/pages/user/modalContents/ModalContent";
import { apiSlice } from "#/redux/apiSlice";
import { type UserResponse } from "#/redux/types";
import { setUser } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserResponse, RegisterData>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data
      })
    }),
    login: builder.mutation<UserResponse, LoginData>({
      query: (data) => {
        const bodyFormData = new FormData();
        bodyFormData.append("username", data.username);
        bodyFormData.append("password", data.password);

        return {
          url: "/login",
          method: "POST",
          body: bodyFormData
        };
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        // Save to redux store
        await queryFulfilled.then((response) => {
          dispatch(setUser(response.data));
        });
      }
    }),
    logout: builder.mutation<null, null>({
      query: () => ({
        url: "/logout",
        method: "POST"
      })
    }),
    //  TODO: Implement
    getMe: builder.query<void, void>({
      query: () => "/user/me"
    }),
    getUserByUsername: builder.query<UserResponse, string>({
      query: (username) => ({
        url: `/user/${username}`
      })
    }),
    updateUserDetails: builder.mutation<UserResponse, UpdateUserDetailsData>({
      query: ({ currentUsername, data }) => ({
        url: `/user/${currentUsername}`,
        method: "PATCH",
        body: data
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        // Save to redux store
        await queryFulfilled.then((response) => {
          dispatch(setUser(response.data));
        });
      }
    }),
    updateUserPassword: builder.mutation<UserResponse, UpdateUserPasswordData>({
      query: ({ currentUsername, data }) => ({
        url: `/user/${currentUsername}/password`,
        method: "PATCH",
        body: data
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        // Save to redux store
        await queryFulfilled.then((response) => {
          dispatch(setUser(response.data));
        });
      }
    }),
    deleteUser: builder.mutation<UserResponse, DeleteUserData>({
      query: ({ username, data }) => ({
        url: `/user/${username}`,
        method: "DELETE",
        body: data
      })
    })
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateUserDetailsMutation,
  useUpdateUserPasswordMutation,
  useDeleteUserMutation
} = authApi;
