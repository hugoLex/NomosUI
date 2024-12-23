import { injectEndpoints } from "./endpoints";
import type {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { TCase, TPrecedent } from "@app/types";

export const casesQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    case: builder.query<TCase, string>({
      query: (id) => {
        return `/cases/detail/${id}`;
        // edit when the endpoint is ready before pushing to production
        // return `case_details/${id}`;
      },
      providesTags: ["CASE"],
    }),

    precedent: builder.query<TPrecedent, string>({
      query: (id) => {
        return `/precedent/cited_cases/${id}`;
      },
      providesTags: ["PRECEDENT"],
    }),
  }),
  overrideExisting: true,
});

export const { useCaseQuery, usePrecedentQuery } = casesQueryAPI;
