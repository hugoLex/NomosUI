import { injectEndpoints } from "./endpoints";
import type {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { TCase, TPrecedent } from "@app/types";

export const casesQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    case: builder.query<TCase, string>({
      query: (id: string) => `api/cases/detail/${id}`,
      providesTags: ["CASE"],
    }),

    precedent: builder.query<TPrecedent, string>({
      query: (id) => {
        return `/precedent/cited_cases/${id}`;
      },
      providesTags: ["PRECEDENT"],
    }),

    precedenCited: builder.query<any, any>({
      query: (id: string) => `api/precedents/cited/${id}`,
    }),

    precedenOverruled: builder.query<any, any>({
      query: (id: string) => `api/precedents/overruled/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useCaseQuery, usePrecedentQuery } = casesQueryAPI;
