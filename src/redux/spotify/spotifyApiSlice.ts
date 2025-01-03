import type { PlatformLoginUriResponse, PlatformTokenResponse, SetPlatformTokensRequest } from "#/redux/types";
import { apiSlice } from "../apiSlice";
import { clearSpotifyToken, setSpotifyToken } from "./spotifySlice";

export const spotifyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpotifyAuthUrl: builder.query<PlatformLoginUriResponse, void>({
      query: () => "/platforms/spotify/login"
    }),

    getSpotifyToken: builder.query<PlatformTokenResponse, void>({
      query: () => "/platforms/spotify/token",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => dispatch(setSpotifyToken(data.token)))
          .catch(() => dispatch(clearSpotifyToken()));
      },
      providesTags: ["SpotifyToken"]
    }),

    setSpotifyTokens: builder.mutation<PlatformTokenResponse, SetPlatformTokensRequest>({
      query: (data) => ({
        url: "/platforms/spotify/callback",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Me", "SpotifyToken"]
    }),

    refreshSpotifyToken: builder.mutation<PlatformTokenResponse, void>({
      query: () => ({
        url: "/platforms/spotify/token",
        method: "PATCH"
      }),
      invalidatesTags: ["SpotifyToken"]
    }),

    disconnectSpotify: builder.mutation<PlatformTokenResponse, void>({
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
  useLazyGetSpotifyTokenQuery,
  useRefreshSpotifyTokenMutation,
  useDisconnectSpotifyMutation
} = spotifyApi;
