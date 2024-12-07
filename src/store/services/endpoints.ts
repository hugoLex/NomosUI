import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL as baseUrl } from "@app/utils";

const baseAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "*/*");
      // headers.set("Access-Control-Allow-Origin", "*");
      // headers.set("Content-Type", "application/json");
      return headers;
    },
  }), 
  tagTypes: ["ARTICLES", "CASES", "LEGISLATIONS","ANALYTICS"],
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
