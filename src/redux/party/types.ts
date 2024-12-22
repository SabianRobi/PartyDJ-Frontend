import type { EPlatformType } from "#/pages/party/components/utils";

// ##################
// ----- MODELS -----
// ##################

export type Track = {
  title: string;
  coverUri: string;
  artists: ArtistResponse[];
  length: number;
  platformType: EPlatformType;
};

export type TrackInQueue = Track & {
  id: number;
  addedBy: {
    username: string;
  };
};

export type PlayedTrack = Track & {
  endedAt: number;
  addedBy: {
    username: string;
  };
};

// ####################
// ----- REQUESTS -----
// ####################

export type SearchTrackRequest = {
  partyName: string;
  query: string;
  platforms: EPlatformType[];
};

export type AddTrackToQueueRequest = {
  partyName: string;
  track: {
    uri: string;
    platformType: EPlatformType;
  };
};

export type GetTracksInQueueRequest = string;
export type PlayNextTrackRequest = string;
export type SetPlaybackDeviceIdRequest = {
  partyName: string;
  deviceId: string;
};
export type GetPlayedTracksRequest = string;

// #####################
// ----- RESPONSES -----
// #####################

export type TrackSearchResultResponse = Track & {
  uri: string;
};

export type TrackSearchResultPreResponse = Omit<
  TrackSearchResultResponse,
  "platformType"
> & {
  platformType: string;
};

export type ArtistResponse = {
  name: string;
};

export type TrackInQueueResponse = Omit<TrackInQueue, "platformType"> & {
  platformType: string;
};

export type PlayedTrackPreResponse = Omit<
  PlayedTrack,
  "platformType" | "endedAt"
> & {
  platformType: string; // "SPOTIFY" | "YOUTUBE"
  endedAt: string; // "2024-06-29 12:16:49"
};
