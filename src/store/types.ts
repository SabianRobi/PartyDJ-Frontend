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

// Backend responses

export interface IUserResponse extends IUser {}

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
