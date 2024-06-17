import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aiURL as baseUrl } from "@app/utils";

const baseAIAPI = createApi({
  reducerPath: "aiAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["CASES"],
  endpoints: () => ({}),
});

export const { endpoints, reducerPath, injectEndpoints, reducer, middleware } =
  baseAIAPI;
