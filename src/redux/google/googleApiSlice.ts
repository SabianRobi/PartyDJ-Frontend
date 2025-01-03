import type { PlatformLoginUriResponse, PlatformTokenResponse, SetPlatformTokensRequest } from "#/redux/types";
import { apiSlice } from "../apiSlice";

export const googleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGoogleAuthUrl: builder.query<PlatformLoginUriResponse, void>({
      query: () => "/platforms/google/login"
    }),

    getGoogleToken: builder.query<PlatformTokenResponse, void>({
      query: () => "/platforms/google/token",
      //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //     await queryFulfilled
      //       .then(({ data }) => dispatch(setSpotifyToken(data.token)))
      //       .catch(() => dispatch(clearSpotifyToken()));
      //   },
      providesTags: ["GoogleToken"]
    }),

    setGoogleTokens: builder.mutation<PlatformTokenResponse, SetPlatformTokensRequest>({
      query: (data) => ({
        url: "/platforms/google/callback",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Me", "GoogleToken"]
    }),

    refreshGoogleToken: builder.mutation<PlatformTokenResponse, void>({
      query: () => ({
        url: "/platforms/google/token",
        method: "PATCH"
      }),
      invalidatesTags: ["GoogleToken"]
    }),

    disconnectGoogle: builder.mutation<PlatformTokenResponse, void>({
      query: () => ({
        url: "/platforms/google/logout",
        method: "POST"
      }),
      invalidatesTags: ["Me", "GoogleToken"]
    })
  })
});

export const {
  useLazyGetGoogleAuthUrlQuery,
  useSetGoogleTokensMutation,
  useLazyGetGoogleTokenQuery,
  useRefreshGoogleTokenMutation,
  useDisconnectGoogleMutation
} = googleApi;
