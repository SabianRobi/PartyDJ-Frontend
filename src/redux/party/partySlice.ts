import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPartyResponse, IPartyState, IUser } from "#/redux/types";

const initialState: IPartyState = {
  party: null,
  role: null,
};

export const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    setParty: (
      state,
      action: PayloadAction<{ party: IPartyResponse; currentUser: IUser }>
    ) => {
      state.party = action.payload.party;

      state.role = action.payload.party.participants.find(
        (participant) => participant.id === action.payload.currentUser.id
      )!.partyRole;
    },
    clearParty: (state) => {
      state.party = null;
    },
  },
});

export const { setParty, clearParty } = partySlice.actions;
export default partySlice.reducer;
