import { SpotifyLoginUriResponse, SpotifyTokenResponse } from "#/redux/types";
import { setSpotifyToken } from "./spotifySlice";
import { apiSlice } from "../apiSlice";

export const spotifyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpotifyAuthUrl: builder.query<SpotifyLoginUriResponse, null>({
      query: () => ({
        url: "/platforms/spotify/login",
      }),
    }),

    getToken: builder.query<SpotifyTokenResponse, void>({
      query: () => ({
        url: `/platforms/spotify/token`,
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          if (response.data) {
            dispatch(
              setSpotifyToken({
                token: response.data.token,
              })
            );
          }
        });
      },
    }),

    // TODO: Make it a POST request in backend
    setSpotifyTokens: builder.query<
      SpotifyTokenResponse,
      { code: string; state: string }
    >({
      query: ({ code, state }) => ({
        url: `/platforms/spotify/callback?code=${code}&state=${state}`,
      }),
    }),
    refreshToken: builder.mutation<SpotifyTokenResponse, void>({
      query: () => ({
        url: `/platforms/spotify/token`,
        method: "PATCH",
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          if (response.data) {
            dispatch(
              setSpotifyToken({
                token: response.data.token,
              })
            );
          }
        });
      },
    }),
  }),
});

export const {
  useLazyGetSpotifyAuthUrlQuery,
  useSetSpotifyTokensQuery,
  useLazyGetTokenQuery,
  useRefreshTokenMutation,
} = spotifyApi;
