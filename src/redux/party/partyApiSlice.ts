import { EPlatformType } from "#/pages/party/components/utils";
import { type CreatePartyFormInput } from "#/pages/party/Create";
import { type JoinPartyFormInput } from "#/pages/party/Join";
import { type GetPartyRequest, type PartyResponse } from "#/redux/types";
import { apiSlice } from "../apiSlice";
import { clearParty } from "./partySlice";
import {
  type AddTrackToQueueRequest,
  type GetPlayedTracksRequest,
  type GetTracksInQueueRequest,
  type PlayedTrack,
  type PlayedTrackPreResponse,
  type PlayNextTrackRequest,
  type SearchTrackRequest,
  type SetPlaybackDeviceIdRequest,
  type TrackInQueue,
  type TrackInQueueResponse,
  type TrackSearchResultPreResponse,
  type TrackSearchResultResponse
} from "./types";

export const partyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createParty: builder.mutation<PartyResponse, CreatePartyFormInput>({
      query: (data) => ({
        url: "/party",
        method: "POST",
        body: data
      }),
      extraOptions: { maxRetries: 0 }
    }),
    joinParty: builder.mutation<PartyResponse, JoinPartyFormInput>({
      query: (data) => ({
        url: `/party/${data.name}/join`,
        method: "POST",
        body: data
      }),
      extraOptions: { maxRetries: 0 }
    }),
    getPartyByName: builder.query<PartyResponse, GetPartyRequest>({
      query: (data) => `/party/${data.name}`
    }),
    leaveParty: builder.mutation<PartyResponse, string>({
      query: (partyName) => ({
        url: `/party/${partyName}/leave`,
        method: "POST"
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(() => {
          dispatch(clearParty());
        });
      },
      extraOptions: { maxRetries: 0 }
    }),
    deleteParty: builder.mutation<PartyResponse, string>({
      query: (partyName) => ({
        url: `/party/${partyName}`,
        method: "DELETE"
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(() => {
          dispatch(clearParty());
        });
      },
      extraOptions: { maxRetries: 0 }
    }),
    searchTracks: builder.query<TrackSearchResultResponse[], SearchTrackRequest>({
      query: ({ partyName, query, platforms }) => ({
        url: `/party/${partyName}/search`,
        params: {
          query: query,
          platforms: platforms
        }
      }),
      transformResponse(response: TrackSearchResultPreResponse[]) {
        return response.map((track) => ({
          ...track,
          platformType: track.platformType === "SPOTIFY" ? EPlatformType.SPOTIFY : EPlatformType.YOUTUBE
        }));
      },
      extraOptions: { maxRetries: 0 }
    }),
    addTrackToQueue: builder.mutation<PartyResponse, AddTrackToQueueRequest>({
      query: (request) => {
        const data = {
          uri: request.track.uri,
          platformType: request.track.platformType === EPlatformType.SPOTIFY ? "SPOTIFY" : "YOUTUBE"
        };

        return {
          url: `/party/${request.partyName}/tracks`,
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json"
          }
        };
      },
      extraOptions: { maxRetries: 0 }
    }),
    getTracksInQueue: builder.query<TrackInQueue[], GetTracksInQueueRequest>({
      query: (partyName) => `/party/${partyName}/tracks`,
      transformResponse(response: TrackInQueueResponse[]) {
        return response.map((track) => ({
          ...track,
          platformType: track.platformType === "SPOTIFY" ? EPlatformType.SPOTIFY : EPlatformType.YOUTUBE
        }));
      },
      extraOptions: { maxRetries: 0 }
    }),
    getPlayedTracks: builder.query<PlayedTrack[], GetPlayedTracksRequest>({
      query: (partyName) => `/party/${partyName}/tracks/previous`,
      transformResponse(response: PlayedTrackPreResponse[]) {
        return response
          .map((track) => ({
            ...track,
            platformType: track.platformType === "SPOTIFY" ? EPlatformType.SPOTIFY : EPlatformType.YOUTUBE,
            endedAt: Date.now() - Date.parse(track.endedAt)
          }))
          .sort((prevTrack, currentTrack) => prevTrack.endedAt - currentTrack.endedAt);
      },
      extraOptions: { maxRetries: 0 }
    }),
    setPlaybackDevice: builder.mutation<PartyResponse, SetPlaybackDeviceIdRequest>({
      query: ({ partyName, deviceId }) => {
        const data = {
          deviceId
        };

        return {
          url: `/party/${partyName}/spotifyDeviceId`,
          method: "POST",
          body: data
        };
      },
      extraOptions: { maxRetries: 0 }
    }),

    skipTrack: builder.mutation<PartyResponse, PlayNextTrackRequest>({
      query: (partyName) => ({
        url: `/party/${partyName}/tracks/playNext`,
        method: "POST"
      })
    })
  })
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
  useSkipTrackMutation
} = partyApi;
