import type { SpotifyLoginUriResponse, SpotifyTokenResponse } from "#/redux/types";
import { apiSlice } from "../apiSlice";
import { clearSpotifyToken, setSpotifyToken } from "./spotifySlice";

export const spotifyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpotifyAuthUrl: builder.query<SpotifyLoginUriResponse, null>({
      query: () => "/platforms/spotify/login"
    }),

    getToken: builder.query<SpotifyTokenResponse, void>({
      query: () => "/platforms/spotify/token"
    }),

    // TODO: Make it a POST request in backend
    setSpotifyTokens: builder.query<SpotifyTokenResponse, { code: string; state: string }>({
      query: ({ code, state }) => ({
        url: `/platforms/spotify/callback?code=${code}&state=${state}`
      })
    }),

    refreshToken: builder.mutation<SpotifyTokenResponse, void>({
      query: () => ({
        url: "/platforms/spotify/token",
        method: "PATCH"
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled.then((response) => {
          if (response.data) {
            dispatch(
              setSpotifyToken({
                token: response.data.token
              })
            );
          }
        });
      }
    }),

    disconnect: builder.mutation<SpotifyTokenResponse, void>({
      query: () => ({
        url: "/platforms/spotify/logout",
        method: "POST"
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled.then((response) => {
          if (response.data) {
            dispatch(clearSpotifyToken());
          }
        });
      }
    })
  })
});

export const {
  useLazyGetSpotifyAuthUrlQuery,
  useSetSpotifyTokensQuery,
  useLazyGetTokenQuery,
  useRefreshTokenMutation,
  useDisconnectMutation
} = spotifyApi;
