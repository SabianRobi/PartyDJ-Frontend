import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetPartyRequest, IPartyResponse } from "../types";
import { ICreatePartyFormInput } from "../../views/party/Create";
import { IJoinPartyFormInput } from "../../views/party/Join";
import { clearParty, setParty } from "./partySlice";

export const partyApi = createApi({
  reducerPath: "partyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/party",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createParty: builder.mutation<IPartyResponse, ICreatePartyFormInput>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    joinParty: builder.mutation<IPartyResponse, IJoinPartyFormInput>({
      query: (data) => ({
        url: `/${data.name}/join`,
        method: "POST",
        body: data,
      }),
    }),
    getPartyByName: builder.query<IPartyResponse, GetPartyRequest>({
      query: (data) => `/${data.name}`,
      onQueryStarted({ currentUser }, { dispatch, queryFulfilled }) {
        queryFulfilled.then((response) => {
          if (response.data) {
            dispatch(
              setParty({ party: response.data, currentUser: currentUser })
            );
          }
        });
      },
    }),
    leaveParty: builder.mutation<IPartyResponse, string>({
      query: (partyName) => ({
        url: `/${partyName}/leave`,
        method: "POST",
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(clearParty());
        });
      },
    }),
    deleteParty: builder.mutation<IPartyResponse, string>({
      query: (partyName) => ({
        url: `/${partyName}`,
        method: "DELETE",
      }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(clearParty());
        });
      },
    }),
  }),
});

export const {
  useCreatePartyMutation,
  useJoinPartyMutation,
  useLazyGetPartyByNameQuery,
  useLeavePartyMutation,
  useDeletePartyMutation,
} = partyApi;
