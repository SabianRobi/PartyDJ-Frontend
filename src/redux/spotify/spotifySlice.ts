import type { Spotify, SpotifyState } from "#/redux/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: SpotifyState = {
  spotify: null
};

export const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setSpotifyToken: (state, action: PayloadAction<Spotify>) => {
      state.spotify = action.payload;
    },
    clearSpotifyTokens: (state) => {
      state.spotify = null;
    }
  }
});

export const { setSpotifyToken, clearSpotifyTokens } = spotifySlice.actions;
export default spotifySlice.reducer;
