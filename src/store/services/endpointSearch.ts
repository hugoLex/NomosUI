import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { searchURL as baseUrl } from "@app/utils";

const baseSearchAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["CASES"],
  endpoints: () => ({}),
});

export const { endpoints, reducerPath, injectEndpoints, reducer, middleware } =
  baseSearchAPI;
