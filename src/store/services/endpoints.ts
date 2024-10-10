import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL as baseUrl } from "@app/utils";

const baseAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["ARTICLES", "CASES", "LEGISLATIONS"],
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
