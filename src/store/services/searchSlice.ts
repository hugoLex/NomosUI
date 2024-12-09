import { injectEndpoints } from "./endpoints";
import type {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import {
  GenericObject,
  ListResponse,
  QueryReturnValue,
  SearchData,
  SearchType,
  TSearchResultData,
} from "@app/types";

type SearchQuery = {
  query: string;
  pageNumber?: number | string;
  searchType?: SearchType;
};

const handlePromiseResults = (results: GenericObject[]) => {
  const errors = results.filter(({ error }) => error).map(({ error }) => error);

  if (errors.length === results.length) {
    // Aggregate all errors into one
    const err = errors.map(
      ({ error }) =>
        new Error(error.details ?? error.message ?? "Unknown occurred")
    );

    throw new AggregateError(err, "Error Occurred");
  }

  return results.map(({ data, error }) => ({ data, error }));
};

export const searchQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<TSearchResultData, SearchQuery>({
      queryFn: async (_arg, _api, _extraOptions, _baseQuery) => {
        let results: QueryReturnValue<
          unknown,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        >[] = [];
        const { query, pageNumber } = _arg;

        const defaultResults = await Promise.all([
          _baseQuery(`api/ask?question=${query}`),
          _baseQuery(`api/semantic/search?query=${query}`),
        ]);

        results.push(...defaultResults);

        try {
          const arrOfResults = handlePromiseResults(results);
          const data = arrOfResults.reduce((acc, result) => {
            let key: string = "";
            let data: any = {};

            if (result.data) {
              data = result.data;
              if (result.data.hasOwnProperty("llm")) {
                key = "llmResult";
              }

              if (result.data.hasOwnProperty("searchID")) {
                key = "searchResult";
              }
            }

            if (result.error) {
              data = null;
              if (!acc.hasOwnProperty("llm")) {
                key = "llmResult";
                return { ...acc, [key]: data };
              }

              if (!acc.hasOwnProperty("searchID")) {
                key = "searchResult";
                return { ...acc, [key]: data };
              }
            }

            return { ...acc, [key]: data };
          }, {}) as TSearchResultData;

          return { data };
        } catch (e: any) {
          const error = {
            status: 500,
            error: e.message,
            data: e.errors,
          } as FetchBaseQueryError;
          console.log(error);
          return { error };
        }
      },
    }),

    searchFilter: builder.query<any, any>({
      query: ({ id, court, year, area_of_law }) => {
        const applyCourt = court ? `&court=${court}` : "";
        const applyYear = year ? `&${year}` : "";
        const appyAreaOfLaw = area_of_law ? `&${area_of_law}` : "";
        const filters = `${applyCourt}${applyYear}${appyAreaOfLaw}`;
        return {
          url: `api/semantic/filter?search_id=${id}${filters}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useSearchFilterQuery, useSearchQuery, usePrefetch } =
  searchQueryAPI;
