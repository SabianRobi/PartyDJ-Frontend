import { EPlatformType } from "../../views/party/components/TrackCard";

export interface ITrack {
  title: string;
  coverUri: string;
  artists: IArtistResponse[];
  length: number;
  platformType: EPlatformType;
}

export interface ITrackInQueue extends ITrack {
  id: number;
  addedBy: {
    username: string;
  };
}

/* --- --- --- Requests --- --- --- */

export interface SearchTrackRequest {
  partyName: string;
  query: string;
  platforms: EPlatformType[];
}

export interface IAddTrackToQueueRequest {
  partyName: string;
  track: {
    uri: string;
    platformType: EPlatformType;
  };
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

export type IArtistResponse = {
  name: string;
};

export interface ITrackInQueueResponse
  extends Omit<ITrackInQueue, "platformType"> {
  platformType: string;
}
