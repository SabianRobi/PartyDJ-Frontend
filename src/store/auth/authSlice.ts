import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../types";

const initialState: IUserState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
