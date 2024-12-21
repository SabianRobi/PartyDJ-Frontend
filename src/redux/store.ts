import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import spotifyReducer from "./spotify/spotifySlice";
import partyReducer from "./party/partySlice";
import { authApi } from "./auth/authApiSlice";
import { spotifyApi } from "./spotify/spotifyApiSlice";
import { partyApi } from "./party/partyApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spotify: spotifyReducer,
    party: partyReducer,
    [authApi.reducerPath]: authApi.reducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    [partyApi.reducerPath]: partyApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      spotifyApi.middleware,
      partyApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
