import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectSpotifyTokens = (state: RootState) => state.spotify;
export const selectParticipatingParty = (state: RootState) => state.party.party;
export const selectParty = (state: RootState) => state.party.party;
export const selectPartyRole = (state: RootState) => state.party.role;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
