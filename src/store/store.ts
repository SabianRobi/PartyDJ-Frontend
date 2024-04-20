import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import spotifyReducer from "./spotify/spotifySlice";
import { authApi } from "./auth/authApiSlice";
import { spotifyApi } from "./spotify/spotifyApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spotify: spotifyReducer,
    [authApi.reducerPath]: authApi.reducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, spotifyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
