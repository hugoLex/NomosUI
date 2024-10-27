import {
  GenericObject,
  ListResponse,
  SearchData,
  SearchType,
} from "@app/types";
import { injectEndpoints } from "./endpoints";
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

type SearchQuery = {
  query: string;
  pageNumber?: number | string;
  searchType?: SearchType;
};

const handlePromiseResults = (results: GenericObject[]) => {
  const errors = results
    .filter(({ error }) => error)
    .map(({ error, meta }) => ({ error, meta }));

  if (errors.length === results.length) {
    // Aggregate all errors into one
    const err = errors.map(
      ({ error }) =>
        new Error(
          error.data.details ?? error.data.message ?? "Unknown occurred"
        )
    );

    throw new AggregateError(err, "Error Occurred");
  }

  return results.filter(({ data }) => data).map(({ data }) => data);
};

export const searchQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    baseSearch: builder.query<SearchData, SearchQuery>({
      queryFn: async (_arg, _api, _extraOptions, _baseQuery) => {
        let results: QueryReturnValue<
          unknown,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        >[] = [];
        const { query, pageNumber, searchType } = _arg;
        // if (pageNumber) {
        //   const llm = await _baseQuery(`/ask?question=${query}`);
        //   results.push(llm);

        //   if (searchType === "cases") {
        //     const result = await _baseQuery(
        //       `/semantic/search?query=${query}${
        //         pageNumber ? `&page=${pageNumber}&size=5` : ""
        //       }`
        //     );

        //     results.push(result);
        //   }

        //   if (searchType === "articles") {
        //     const result = await _baseQuery(
        //       `/articles/search?query=${query}${
        //         pageNumber ? `&page=${pageNumber}&size=5` : ""
        //       }`
        //     );

        //     results.push(result);
        //   }

        //   if (searchType === "legislations") {
        //     const result = await _baseQuery(
        //       `/legislation/search?query=${query}}${
        //         pageNumber ? `&page=${pageNumber}&size=5` : ""
        //       }`
        //     );

        //     results.push(result);
        //   }
        // } else {
        const defaultResults = await Promise.all([
          _baseQuery(`/ask?question=${query}`),
          _baseQuery(`/semantic/search?query=${query}`),
          _baseQuery(`/articles/search?query=${query}`),
          _baseQuery(`/legislation/search?query=${query}`),
        ]);

        results.push(...defaultResults);
        // }

        try {
          const arrOfResults = handlePromiseResults(results);
          const data = arrOfResults.reduce((acc, result) => {
            let key: string = "";
            if ("llm" in result) key = "llmData";
            if ("total_cases" in result) key = "casesData";
            if ("total_articles" in result) key = "articlesData";
            if ("total_legislation" in result) key = "legislationsData";

            return { ...acc, [key]: result };
          }, {}) as SearchData;

          return { data };
        } catch (e: any) {
          const error = {
            status: 500,
            error: e.message,
            data: e.errors,
          } as FetchBaseQueryError;
          return { error };
        }
      },
    }),

    baseFilter: builder.query<any, any>({
      query: ({ id, court, year, area_of_law }) => {
        const applyCourt = court ? `&court=${court}` : "";
        const applyYear = year ? `&${year}` : "";
        const appyAreaOfLaw = area_of_law ? `&${area_of_law}` : "";
        const filters = `${applyCourt}${applyYear}${appyAreaOfLaw}`;
        return {
          url: `/semantic/filter?search_id=${id}${filters}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useBaseSearchQuery, useBaseFilterQuery, usePrefetch } =
  searchQueryAPI;
