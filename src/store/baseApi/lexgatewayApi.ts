import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logOut, setCredentials } from "../auth/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://lexgateway.lexanalytics.ai",
  // credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     // If we have a token set in state, let's assume that we should be passing it.
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   //   confirm the status code from the backend that is sent when access
//   //  token would be valid but has expired
//   console.log(
//     "response from rtk query endpoint call:",
//     // result?.error?.originalStatus && result?.error?.originalStatus,
//     result?.data
//   );
//   if (result?.error?.originalStatus === 401) {
//     console.log("Sending a refresh token");
//     // send refresh toekn to get new access token
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       //   retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//   return result;
// };

export const lexGateWayApiSlice = createApi({
  baseQuery: baseQuery,
//   baseQuery: baseQueryWithReauth,
  tagTypes: ["Analytics","Judge","Counsel" ],
  endpoints: (builder) => ({}),
});
