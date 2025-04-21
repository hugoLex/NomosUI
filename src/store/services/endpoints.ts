import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL as baseUrl } from "@app/utils";

import Cookies from "js-cookie";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { logOut, setCredentials } from "../slices/authSlice";





const base_url_determined = {
  production: baseUrl, test: baseUrl,
  development: baseUrl
  // development: "http://127.0.0.1:8000/api"
}[process.env.NODE_ENV]
interface RefreshTokenData {
  access: string;
  refresh: string;
}
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const access_token = Cookies.get("access_token");
    // console.log("Access token to be used for query fetching check rtk baseQuery", access_token)
    // use token from state when dextor app is ready
    // const token = (getState() as RootState)?.auth?.token;
    if (access_token) {
      headers.set("Accept", "*/*");
      headers.set("authorization", `Bearer ${access_token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if (true) {
  if (result.error && result?.error?.status === 401) {
    console.log("Requesting a refresh token", result.error);
    //  Use refresh token to get access token
    const refresh_token = Cookies.get("refresh_token")
    // console.log("refresh token:", refresh_token);

    const refreshResult: Awaited<ReturnType<typeof baseQuery>> =
      await baseQuery({
        url: `${base_url_determined}/v1/auth/token/refresh`,
        headers: {
          "Accept": "*/*",
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: { refresh: refresh_token }
      }, api, extraOptions);
    console.log("refresh token result", refreshResult);
    if (refreshResult.error && refreshResult?.error?.status === 401) {
      // if the access token expires and refresh token also expires then the user must login again
      // Token refresh failed (blacklisted/expired) → Force logout by clearing access and refresh tokens
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      api.dispatch(logOut());
      // console.log("access and refresh tokens cleared and user logged out")
      window.location.href = "/auth/login";

    } else if (refreshResult?.data) {
      // const user = (api.getState() as RootState)?.auth?.user;
      // console.log("user from refresh token rtk", user);
      if ((refreshResult.data as RefreshTokenData)?.access) {
        // if (user) {

        Cookies.set(
          "access_token",
          (refreshResult.data as RefreshTokenData)?.access
        );
        Cookies.set(
          "refresh_token",
          (refreshResult.data as RefreshTokenData)?.refresh
        );
        // api.dispatch(
        //   setCredentials({
        //     user: user,
        //     access_token: (refreshResult.data as RefreshTokenData)?.access,
        //   })
        // );
      } else {
        console.log("Access token is missing");
      }
      console.log("access token gotten and used to fetch data:", result);
      result = await baseQuery(args, api, extraOptions);
      return result
    } else {
      console.log("There is an unhandled error in rtk api");
    }
  }

  return result;
};

const baseAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl,
  //   prepareHeaders: (headers, { getState }) => {
  //     headers.set("Accept", "*/*");
  //     // headers.set("Access-Control-Allow-Origin", "*");
  //     // headers.set("Content-Type", "application/json");
  //     return headers;
  //   },
  // }),
  tagTypes: [
    "SEARCH",
    "CASE",
    "PRECEDENT",
    "CASES",
    "Analytics",
    "Judge",
    "Counsel",
    "User",
    "LlmSearch",
    "SemanticSearch",
  ],
  endpoints: () => ({}),
});

export const {
  endpoints,
  reducerPath,
  injectEndpoints,
  reducer,
  middleware,
  usePrefetch,
} = baseAPI;
