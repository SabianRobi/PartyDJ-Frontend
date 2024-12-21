// for Redux

export interface IUser {
  id: number;
  email: string;
  username: string;
  spotifyConnected: boolean;
  partyName: string;
}

export interface IUserState {
  user: IUser | null;
}

export interface ISpotify {
  token: string;
}

export interface ISpotifyState {
  spotify: ISpotify | null;
}

export interface IPartyState {
  party: IPartyResponse | null;
  role: PartyRole | null;
}

export type PartyRole = "CREATOR" | "PARTICIPANT";

// Requests

export interface IUpdateUserDetailsRequest {
  email: string;
  username: string;
}

export interface IUpdateUserPasswordRequest {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface IPartyState {
  party: IPartyResponse | null;
}

export interface GetPartyRequest {
  name: string;
  currentUser: IUser;
}

// Backend responses

export interface IUserResponse extends IUser {}

export interface ISpotifyLoginUriResponse {
  uri: string;
}

export interface ISpotifyTokenResponse {
  token: string;
}

export interface IPartyResponse {
  id: number;
  name: string;
  tracksInQueue: ITrackInQueueResponse[];
  participants: IUserInPartyResponse[];
}

interface ITrackInQueueResponse {
  id: number;
  title: string;
  artists: IArtistResponse[];
  coverUri: string;
  length: number;
  platformType: "SPOTIFY";
  addedBy: IUserInPartyTrackInQueueResponse;
}

interface IArtistResponse {
  name: string;
}

interface IUserInPartyTrackInQueueResponse {
  username: string;
}

interface IUserInPartyResponse {
  id: number;
  username: string;
  partyRole: PartyRole;
}

export interface IGeneralErrorResponse {
  status: number;
  data: {
    timestamp: string;
    status: number;
    errors: {
      [key: string]: string;
    };
  };
}
