import { injectEndpoints } from "./endpoints";
import { TCase, TPrecedent } from "@app/types";

export const casesQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    case: builder.query<TCase, string>({
      query: (id: string) => `/cases/detail/${id}`,
      providesTags: ["CASE"],
    }),
    // https://webapp.lexanalytics.ai/api/cases/detail/ce1f8469-a471-4bda-ba5c-0d4719bc23fb
    precedent: builder.query<TPrecedent, string>({
      query: (id) => {
        return `/precedent/cited_cases/${id}`;
      },
      providesTags: ["PRECEDENT"],
    }),

    precedenCited: builder.query<any, any>({
      query: (id: string) => `/precedents/cited/${id}`,
    }),

    precedenOverruled: builder.query<any, any>({
      query: (id: string) => `/precedents/overruled/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useCaseQuery, usePrecedentQuery, usePrecedenCitedQuery } =
  casesQueryAPI;
