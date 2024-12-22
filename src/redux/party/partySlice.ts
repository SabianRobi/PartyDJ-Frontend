import type { PartyResponse, PartyState, User } from "#/redux/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: PartyState = {
  party: null,
  role: null
};

export const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    setParty: (
      state,
      action: PayloadAction<{ party: PartyResponse; currentUser: User }>
    ) => {
      state.party = action.payload.party;

      state.role = action.payload.party.participants.find(
        (participant) => participant.id === action.payload.currentUser.id
      )!.partyRole;
    },
    clearParty: (state) => {
      state.party = null;
    }
  }
});

export const { setParty, clearParty } = partySlice.actions;
export default partySlice.reducer;
