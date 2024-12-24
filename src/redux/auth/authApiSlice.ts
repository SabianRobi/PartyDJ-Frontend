import { type LoginData } from "#/pages/auth/Login";
import { type RegisterData } from "#/pages/auth/Register";
import {
  type DeleteUserData,
  type UpdateUserDetailsData,
  type UpdateUserPasswordData
} from "#/pages/user/modalContents/ModalContent";
import { apiSlice } from "#/redux/apiSlice";
import { type UserResponse } from "#/redux/types";
import { clearUser, setUser } from "./authSlice";

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
      invalidatesTags: ["Me"]
    }),

    logout: builder.mutation<null, null>({
      query: () => ({
        url: "/logout",
        method: "POST"
      }),
      invalidatesTags: ["Me", "Party", "SpotifyToken"]
    }),

    getMe: builder.query<UserResponse, void>({
      query: () => "/user/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(({ data }) => dispatch(setUser(data))).catch(() => dispatch(clearUser()));
      },
      providesTags: ["Me"]
    }),

    getUserByUsername: builder.query<UserResponse, string>({
      query: (username) => `/user/${username}`
    }),

    updateUserDetails: builder.mutation<UserResponse, UpdateUserDetailsData>({
      query: ({ currentUsername, data }) => ({
        url: `/user/${currentUsername}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["Me"]
    }),

    updateUserPassword: builder.mutation<UserResponse, UpdateUserPasswordData>({
      query: ({ currentUsername, data }) => ({
        url: `/user/${currentUsername}/password`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["Me"]
    }),

    deleteUser: builder.mutation<UserResponse, DeleteUserData>({
      query: ({ username, data }) => ({
        url: `/user/${username}`,
        method: "DELETE",
        body: data
      }),
      invalidatesTags: ["Me", "Party", "SpotifyToken"]
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
