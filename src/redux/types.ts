// for Redux

export type User = {
  id: number;
  email: string;
  username: string;
  spotifyConnected: boolean;
  partyName: string;
}

export type UserState = {
  user: User | null;
}

export type Spotify = {
  token: string;
}

export type SpotifyState = {
  spotify: Spotify | null;
}

export type PartyState = {
  party: PartyResponse | null;
  role: PartyRole | null;
}

export type PartyRole = "CREATOR" | "PARTICIPANT";

// Requests

export type UpdateUserDetailsRequest = {
  email: string;
  username: string;
}

export type UpdateUserPasswordRequest = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export type GetPartyRequest = {
  name: string;
  currentUser: User;
}

// Backend responses

export type UserResponse = User;

export type SpotifyLoginUriResponse = {
  uri: string;
}

export type SpotifyTokenResponse = {
  token: string;
}

export type PartyResponse = {
  id: number;
  name: string;
  tracksInQueue: TrackInQueueResponse[];
  participants: UserInPartyResponse[];
}

type TrackInQueueResponse = {
  id: number;
  title: string;
  artists: ArtistResponse[];
  coverUri: string;
  length: number;
  platformType: "SPOTIFY";
  addedBy: UserInPartyTrackInQueueResponse;
}

type ArtistResponse = {
  name: string;
}

type UserInPartyTrackInQueueResponse = {
  username: string;
}

type UserInPartyResponse = {
  id: number;
  username: string;
  partyRole: PartyRole;
}

export type GeneralErrorResponse = {
  status: number;
  data: {
    timestamp: string;
    status: number;
    errors: {
      [key: string]: string;
    };
  };
}
