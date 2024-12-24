import type { SpotifyState } from "#/redux/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: SpotifyState = {
  token: null
};

export const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setSpotifyToken: (state, action: PayloadAction<SpotifyState["token"]>) => {
      state.token = action.payload;
    },
    clearSpotifyToken: (state) => {
      state.token = null;
    }
  }
});

export const { setSpotifyToken, clearSpotifyToken } = spotifySlice.actions;
export default spotifySlice.reducer;
