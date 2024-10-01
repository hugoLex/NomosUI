import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL as baseUrl } from "@app/utils";

const baseAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["CASES"],
  endpoints: () => ({}),
});

export const { endpoints, reducerPath, injectEndpoints, reducer, middleware } =
  baseAPI;
