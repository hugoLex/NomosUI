import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aiURL, searchURL } from "@app/utils";

const baseSearchAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({ baseUrl: searchURL }),
  tagTypes: ["CASES"],
  endpoints: () => ({}),
});

export const { endpoints, reducerPath, injectEndpoints, reducer, middleware } =
  baseSearchAPI;
