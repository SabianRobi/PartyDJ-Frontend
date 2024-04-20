import { createSlice } from "@reduxjs/toolkit";
import { ISpotifyState } from "../types";

const initialState: ISpotifyState = {
  spotify: null,
};

export const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setSpotifyTokens: (state, action) => {
      state.spotify = action.payload;
    },
  },
});

export const { setSpotifyTokens } = spotifySlice.actions;
export default spotifySlice.reducer;
