import { EPlatformType } from "../../views/party/components/TrackCard";

export interface ITrack {
  title: string;
  coverUri: string;
  artists: IArtistResponse[];
  duration: number;
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

export interface IArtistResponse {
  name: string;
}
