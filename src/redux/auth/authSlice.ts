import type { User, UserState } from "#/redux/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
