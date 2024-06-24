import { EPlatformType } from "../../views/party/components/TrackCard";

export interface ITrack {
  title: string;
  coverUri: string;
  artists: IArtistResponse[];
  length: number;
  platformType: EPlatformType;
}

/* --- --- --- Requests --- --- --- */

export interface SearchTrackRequest {
  partyName: string;
  query: string;
  platforms: EPlatformType[];
}

/* --- --- --- Responses --- --- --- */

export interface ITrackSearchResultResponse extends ITrack {
  uri: string;
}

export type ITrackSearchResultPreResponse = Omit<
  ITrackSearchResultResponse,
  "platformType"
> & {
  platformType: string;
};

export type IArtistResponse = string;
