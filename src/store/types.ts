// for Redux

export interface IUser {
  id: number;
  email: string;
  username: string;
  isSpotifyConnected: boolean;
}

export interface IUserState {
  user: IUser | null;
}

export interface ISpotify {
  token: string;
  refreshToken: string;
}

export interface ISpotifyState {
  spotify: ISpotify | null;
}

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

// Backend responses

export interface IUserResponse extends IUser {}

export interface ISpotifyLoginUriResponse {
  uri: string;
}

export interface ISpotifyTokenResponse {
  token: string;
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
