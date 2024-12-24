import type { SetSpotifyTokensRequest, SpotifyLoginUriResponse, SpotifyTokenResponse } from "#/redux/types";
import { apiSlice } from "../apiSlice";
import { clearSpotifyToken, setSpotifyToken } from "./spotifySlice";

export const spotifyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpotifyAuthUrl: builder.query<SpotifyLoginUriResponse, null>({
      query: () => "/platforms/spotify/login"
    }),

    getToken: builder.query<SpotifyTokenResponse, void>({
      query: () => "/platforms/spotify/token",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => dispatch(setSpotifyToken(data.token)))
          .catch(() => dispatch(clearSpotifyToken()));
      },
      providesTags: ["SpotifyToken"]
    }),

    setSpotifyTokens: builder.mutation<SpotifyTokenResponse, SetSpotifyTokensRequest>({
      query: (data) => ({
        url: "/platforms/spotify/callback",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Me", "SpotifyToken"]
    }),

    refreshToken: builder.mutation<SpotifyTokenResponse, void>({
      query: () => ({
        url: "/platforms/spotify/token",
        method: "PATCH"
      }),
      invalidatesTags: ["SpotifyToken"]
    }),

    disconnect: builder.mutation<SpotifyTokenResponse, void>({
      query: () => ({
        url: "/platforms/spotify/logout",
        method: "POST"
      }),
      invalidatesTags: ["Me", "SpotifyToken"]
    })
  })
});

export const {
  useLazyGetSpotifyAuthUrlQuery,
  useSetSpotifyTokensMutation,
  useLazyGetTokenQuery,
  useRefreshTokenMutation,
  useDisconnectMutation
} = spotifyApi;
