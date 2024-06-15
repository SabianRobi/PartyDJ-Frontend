import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetPartyRequest, IPartyResponse } from "../types";
import { ICreatePartyFormInput } from "../../views/party/Create";
import { IJoinPartyFormInput } from "../../views/party/Join";
import { setParty } from "./partySlice";

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
        url: `/${data.name}`,
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
  }),
});

export const {
  useCreatePartyMutation,
  useJoinPartyMutation,
  useLazyGetPartyByNameQuery,
} = partyApi;
