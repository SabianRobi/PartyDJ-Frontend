import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { GetPartyRequest, IPartyResponse } from "../types";
import { ICreatePartyFormInput } from "../../views/party/Create";
import { IJoinPartyFormInput } from "../../views/party/Join";
import { clearParty, setParty } from "./partySlice";
import {
  GetPlayedTracksRequest,
  GetTracksInQueueRequest,
  IAddTrackToQueueRequest,
  IPlayedTrack,
  IPlayedTrackPreResponse,
  ITrackInQueue,
  ITrackInQueueResponse,
  ITrackSearchResultPreResponse,
  ITrackSearchResultResponse,
  PlayNextTrackRequest,
  SearchTrackRequest,
  SetPlaybackDeviceIdRequest,
} from "./types";
import { EPlatformType } from "../../views/party/components/TrackCard";

export const partyApi = createApi({
  reducerPath: "partyApi",
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: "http://localhost:8080/api/v1/party",
      credentials: "include",
    }),
    {
      maxRetries: 60, // Retry for 10 minutes (60 * 10 seconds)
      backoff: () => {
        return new Promise((resolve) => {
          setTimeout(resolve, 10000); // Retry every 10 seconds
        });
      },
    }
  ),
  endpoints: (builder) => ({
    createParty: builder.mutation<IPartyResponse, ICreatePartyFormInput>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      extraOptions: { maxRetries: 0 },
    }),
    joinParty: builder.mutation<IPartyResponse, IJoinPartyFormInput>({
      query: (data) => ({
        url: `/${data.name}/join`,
        method: "POST",
        body: data,
      }),
      extraOptions: { maxRetries: 0 },
    }),
    getPartyByName: builder.query<IPartyResponse, GetPartyRequest>({
      query: (data) => `/${data.name}`,
      onQueryStarted({ currentUser }, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          if (response.data) {
            dispatch(
              setParty({ party: response.data, currentUser: currentUser })
            );
          }
        });
      },
      extraOptions: { maxRetries: 0 },
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
      extraOptions: { maxRetries: 0 },
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
      extraOptions: { maxRetries: 0 },
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
      extraOptions: { maxRetries: 0 },
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
      extraOptions: { maxRetries: 0 },
    }),
    getTracksInQueue: builder.query<ITrackInQueue[], GetTracksInQueueRequest>({
      query: (partyName) => `/${partyName}/tracks`,
      transformResponse(response: ITrackInQueueResponse[]) {
        return response.map((track) => ({
          ...track,
          platformType:
            track.platformType === "SPOTIFY"
              ? EPlatformType.SPOTIFY
              : EPlatformType.YOUTUBE,
        }));
      },
      extraOptions: { maxRetries: 0 },
    }),
    getPlayedTracks: builder.query<IPlayedTrack[], GetPlayedTracksRequest>({
      query: (partyName) => `/${partyName}/tracks/previous`,
      transformResponse(response: IPlayedTrackPreResponse[]) {
        return response
          .map((track) => ({
            ...track,
            platformType:
              track.platformType === "SPOTIFY"
                ? EPlatformType.SPOTIFY
                : EPlatformType.YOUTUBE,
            endedAt: Date.now() - Date.parse(track.endedAt),
          }))
          .sort(
            (prevTrack, currentTrack) =>
              prevTrack.endedAt - currentTrack.endedAt
          );
      },
      extraOptions: { maxRetries: 0 },
    }),
    setPlaybackDevice: builder.mutation<
      IPartyResponse,
      SetPlaybackDeviceIdRequest
    >({
      query: ({ partyName, deviceId }) => {
        const data = {
          deviceId,
        };

        return {
          url: `/${partyName}/spotifyDeviceId`,
          method: "POST",
          body: data,
        };
      },
      extraOptions: { maxRetries: 0 },
    }),

    skipTrack: builder.mutation<IPartyResponse, PlayNextTrackRequest>({
      query: (partyName) => ({
        url: `/${partyName}/tracks/playNext`,
        method: "POST",
      }),
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
  useGetTracksInQueueQuery,
  useGetPlayedTracksQuery,
  useSetPlaybackDeviceMutation,
  useSkipTrackMutation,
} = partyApi;
