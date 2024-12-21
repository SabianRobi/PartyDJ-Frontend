import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISpotify, ISpotifyState } from "../types";

const initialState: ISpotifyState = {
  spotify: null,
};

export const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setSpotifyToken: (state, action: PayloadAction<ISpotify>) => {
      state.spotify = action.payload;
    },
    clearSpotifyTokens: (state) => {
      state.spotify = null;
    },
  },
});

export const { setSpotifyToken, clearSpotifyTokens } = spotifySlice.actions;
export default spotifySlice.reducer;
