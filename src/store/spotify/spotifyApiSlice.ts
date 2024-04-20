import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISpotifyLoginUriResponse, ISpotifyTokenResponse } from "../types";

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

    // TODO: Make it a POST request in backend
    setSpotifyTokens: builder.query<
      ISpotifyTokenResponse,
      { code: string; state: string }
    >({
      query: ({ code, state }) => ({
        url: `/callback?code=${code}&state=${state}`,
      }),
    }),
  }),
});

export const { useLazyGetSpotifyAuthUrlQuery, useSetSpotifyTokensQuery } =
  spotifyApi;
