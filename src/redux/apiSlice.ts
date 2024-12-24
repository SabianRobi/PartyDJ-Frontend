// import { Mutex } from "async-mutex";
import {
  // type BaseQueryApi,
  // type BaseQueryFn,
  // type FetchArgs,
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
// import { setUser, clearUser } from "#/redux/auth/authSlice";
// import type { RootState } from "#/redux/store";
// import { User } from "./types";

// const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/v1",
  credentials: "include"
});

// const baseQueryWithReauth: BaseQueryFn = async (
//   args: FetchArgs,
//   api: BaseQueryApi,
//   extraOptions: object
// ) => {
//   await mutex.waitForUnlock();
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error && result.error.status === 401) {
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();

//       try {
//         // Send refresh token to get new access token
//         const refreshResult = await baseQuery(
//           {
//             url: "/auth/refresh-token/",
//             method: "POST",
//           },
//           api,
//           extraOptions
//         );

//         // Set credentials & try again the request
//         if (refreshResult?.data) {
//           const user = (api.getState() as RootState).auth.user;
//           api.dispatch(setUser(user as User));

//           // Retry the original query with new access token
//           result = await baseQuery(args, api, extraOptions);
//         } else {
//           api.dispatch(clearUser());
//         }
//       } finally {
//         release();
//       }
//     } else {
//       await mutex.waitForUnlock();
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }

//   return result;
// };

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Me", "SpotifyToken", "Party"],
  endpoints: () => ({})
});
