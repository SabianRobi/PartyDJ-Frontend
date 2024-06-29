import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISpotifyLoginUriResponse, ISpotifyTokenResponse } from "../types";
import { setSpotifyToken } from "./spotifySlice";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/platforms/spotify",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getSpotifyAuthUrl: builder.query<ISpotifyLoginUriResponse, null>({
      query: () => ({
        url: "/login",
      }),
    }),

    getToken: builder.query<ISpotifyTokenResponse, void>({
      query: () => ({
        url: `/token`,
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          if (response.data) {
            dispatch(
              setSpotifyToken({
                token: response.data.token,
              }),
            );
          }
        });
      },
    }),

    // TODO: Make it a POST request in backend
    setSpotifyTokens: builder.query<
      ISpotifyTokenResponse,
      { code: string; state: string }
    >({
      query: ({ code, state }) => ({
        url: `/callback?code=${code}&state=${state}`,
      }),
    }),
    refreshToken: builder.mutation<ISpotifyTokenResponse, void>({
      query: () => ({
        url: `/token`,
        method: "PATCH",
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          if (response.data) {
            dispatch(
              setSpotifyToken({
                token: response.data.token,
              }),
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
