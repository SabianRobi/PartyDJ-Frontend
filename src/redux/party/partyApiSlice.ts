import { EPlatformType } from "#/pages/party/components/utils";
import { type CreatePartyFormInput } from "#/pages/party/Create";
import { type JoinPartyFormInput } from "#/pages/party/Join";
import type { GetPartyRequest, PartyResponse, User } from "#/redux/types";
import { apiSlice } from "../apiSlice";
import type { RootState } from "../store";
import { clearParty, setParty } from "./partySlice";
import type {
  AddTrackToQueueRequest,
  GetPlayedTracksRequest,
  GetTracksInQueueRequest,
  PlayedTrack,
  PlayedTrackPreResponse,
  PlayNextTrackRequest,
  SearchTrackRequest,
  SetPlaybackDeviceIdRequest,
  TrackInQueue,
  TrackInQueueResponse,
  TrackSearchResultPreResponse,
  TrackSearchResultResponse
} from "./types";

export const partyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createParty: builder.mutation<PartyResponse, CreatePartyFormInput>({
      query: (data) => ({
        url: "/party",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Party", "Me"]
    }),

    joinParty: builder.mutation<PartyResponse, JoinPartyFormInput>({
      query: (data) => ({
        url: `/party/${data.name}/join`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Party", "Me"]
    }),

    getPartyByName: builder.query<PartyResponse, GetPartyRequest>({
      query: (data) => `/party/${data.name}`,
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        await queryFulfilled
          .then(({ data }) =>
            dispatch(setParty({ party: data, currentUser: (getState() as RootState).auth.user as User }))
          )
          .catch(() => dispatch(clearParty()));
      },
      providesTags: ["Party"]
    }),

    leaveParty: builder.mutation<PartyResponse, string>({
      query: (partyName) => ({
        url: `/party/${partyName}/leave`,
        method: "POST"
      }),
      invalidatesTags: ["Party", "Me"]
    }),

    deleteParty: builder.mutation<PartyResponse, string>({
      query: (partyName) => ({
        url: `/party/${partyName}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Party", "Me"]
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
      }
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
      }
    }),

    getTracksInQueue: builder.query<TrackInQueue[], GetTracksInQueueRequest>({
      query: (partyName) => `/party/${partyName}/tracks`,
      transformResponse(response: TrackInQueueResponse[]) {
        return response.map((track) => ({
          ...track,
          platformType: track.platformType === "SPOTIFY" ? EPlatformType.SPOTIFY : EPlatformType.YOUTUBE
        }));
      }
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
      }
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
      }
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
