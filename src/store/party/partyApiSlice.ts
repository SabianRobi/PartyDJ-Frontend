import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetPartyRequest, IPartyResponse } from "../types";
import { ICreatePartyFormInput } from "../../views/party/Create";
import { IJoinPartyFormInput } from "../../views/party/Join";
import { clearParty, setParty } from "./partySlice";
import {
  IAddTrackToQueueRequest,
  ITrackSearchResultPreResponse,
  ITrackSearchResultResponse,
  SearchTrackRequest,
} from "./types";
import { EPlatformType } from "../../views/party/components/TrackCard";

export const partyApi = createApi({
  reducerPath: "partyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/party",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createParty: builder.mutation<IPartyResponse, ICreatePartyFormInput>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    joinParty: builder.mutation<IPartyResponse, IJoinPartyFormInput>({
      query: (data) => ({
        url: `/${data.name}/join`,
        method: "POST",
        body: data,
      }),
    }),
    getPartyByName: builder.query<IPartyResponse, GetPartyRequest>({
      query: (data) => `/${data.name}`,
      onQueryStarted({ currentUser }, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          if (response.data) {
            dispatch(
              setParty({ party: response.data, currentUser: currentUser }),
            );
          }
        });
      },
    }),
    leaveParty: builder.mutation<IPartyResponse, string>({
      query: (partyName) => ({
        url: `/${partyName}/leave`,
        method: "POST",
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(clearParty());
        });
      },
    }),
    deleteParty: builder.mutation<IPartyResponse, string>({
      query: (partyName) => ({
        url: `/${partyName}`,
        method: "DELETE",
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(clearParty());
        });
      },
    }),
    searchTracks: builder.query<
      ITrackSearchResultResponse[],
      SearchTrackRequest
    >({
      query: ({ partyName, query, platforms }) => ({
        url: `/${partyName}/search`,
        params: {
          query: query,
          platforms: platforms,
        },
      }),
      transformResponse(response: ITrackSearchResultPreResponse[]) {
        return response.map((track) => ({
          ...track,
          platformType:
            track.platformType === "SPOTIFY"
              ? EPlatformType.SPOTIFY
              : EPlatformType.YOUTUBE,
        }));
      },
    }),
    addTrackToQueue: builder.mutation<IPartyResponse, IAddTrackToQueueRequest>({
      query: (request) => {
        const data = {
          uri: request.track.uri,
          platformType:
            request.track.platformType === EPlatformType.SPOTIFY
              ? "SPOTIFY"
              : "YOUTUBE",
        };

        return {
          url: `/${request.partyName}/tracks`,
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useCreatePartyMutation,
  useJoinPartyMutation,
  useLazyGetPartyByNameQuery,
  useLeavePartyMutation,
  useDeletePartyMutation,
  useLazySearchTracksQuery,
  useAddTrackToQueueMutation,
} = partyApi;
