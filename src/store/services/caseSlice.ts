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
        return `case_details/${id}`;
      },
    }),

    precedent: builder.query<TPrecedent, string>({
      query: (id) => {
        return `/precedent/cited_cases/${id}`;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useCaseQuery, usePrecedentQuery } = casesQueryAPI;
