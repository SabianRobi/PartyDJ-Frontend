import { GetPartyRequest, PartyResponse } from "#/redux/types";
import { ICreatePartyFormInput } from "#/pages/party/Create";
import { IJoinPartyFormInput } from "#/pages/party/Join";
import { clearParty, setParty } from "./partySlice";
import {
  GetPlayedTracksRequest,
  GetTracksInQueueRequest,
  AddTrackToQueueRequest,
  PlayedTrack,
  PlayedTrackPreResponse,
  TrackInQueue,
  TrackInQueueResponse,
  TrackSearchResultPreResponse,
  TrackSearchResultResponse,
  PlayNextTrackRequest,
  SearchTrackRequest,
  SetPlaybackDeviceIdRequest,
} from "./types";
import { EPlatformType } from "#/pages/party/components/TrackCard";
import { apiSlice } from "../apiSlice";

export const partyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createParty: builder.mutation<PartyResponse, ICreatePartyFormInput>({
      query: (data) => ({
        url: "/party",
        method: "POST",
        body: data,
      }),
      extraOptions: { maxRetries: 0 },
    }),
    joinParty: builder.mutation<PartyResponse, IJoinPartyFormInput>({
      query: (data) => ({
        url: `/party/${data.name}/join`,
        method: "POST",
        body: data,
      }),
      extraOptions: { maxRetries: 0 },
    }),
    getPartyByName: builder.query<PartyResponse, GetPartyRequest>({
      query: (data) => `/party/${data.name}`,
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
    leaveParty: builder.mutation<PartyResponse, string>({
      query: (partyName) => ({
        url: `/party/${partyName}/leave`,
        method: "POST",
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(clearParty());
        });
      },
      extraOptions: { maxRetries: 0 },
    }),
    deleteParty: builder.mutation<PartyResponse, string>({
      query: (partyName) => ({
        url: `/party/${partyName}`,
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
      TrackSearchResultResponse[],
      SearchTrackRequest
    >({
      query: ({ partyName, query, platforms }) => ({
        url: `/party/${partyName}/search`,
        params: {
          query: query,
          platforms: platforms,
        },
      }),
      transformResponse(response: TrackSearchResultPreResponse[]) {
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
    addTrackToQueue: builder.mutation<PartyResponse, AddTrackToQueueRequest>({
      query: (request) => {
        const data = {
          uri: request.track.uri,
          platformType:
            request.track.platformType === EPlatformType.SPOTIFY
              ? "SPOTIFY"
              : "YOUTUBE",
        };

        return {
          url: `/party/${request.partyName}/tracks`,
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      extraOptions: { maxRetries: 0 },
    }),
    getTracksInQueue: builder.query<TrackInQueue[], GetTracksInQueueRequest>({
      query: (partyName) => `/party/${partyName}/tracks`,
      transformResponse(response: TrackInQueueResponse[]) {
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
    getPlayedTracks: builder.query<PlayedTrack[], GetPlayedTracksRequest>({
      query: (partyName) => `/party/${partyName}/tracks/previous`,
      transformResponse(response: PlayedTrackPreResponse[]) {
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
      PartyResponse,
      SetPlaybackDeviceIdRequest
    >({
      query: ({ partyName, deviceId }) => {
        const data = {
          deviceId,
        };

        return {
          url: `/party/${partyName}/spotifyDeviceId`,
          method: "POST",
          body: data,
        };
      },
      extraOptions: { maxRetries: 0 },
    }),

    skipTrack: builder.mutation<PartyResponse, PlayNextTrackRequest>({
      query: (partyName) => ({
        url: `/party/${partyName}/tracks/playNext`,
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
