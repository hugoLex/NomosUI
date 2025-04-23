import { injectEndpoints } from "./endpoints";
import type {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import {
  GenericObject,
  ListResponse,
  LLMResult,
  QueryReturnValue,
  SearchResultDocumentMetaDocType,
  SearchSuggestion,
  TSearchResultClassifier,
  TSearchResultData,
  TSearchResultDocuments,
} from "@app/types";
import { baseURL } from "@app/utils";

type SearchQuery = {
  query: string;
  pageNumber?: number | string;
  searchType?: SearchResultDocumentMetaDocType;
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
        const { query, pageNumber, searchType } = _arg;

        const [llm, search] = await Promise.all([
          fetch(`${baseURL}/ask?${query}`),
          _baseQuery(
            `/semantic/search?query=${query}${searchType ? `&document_type=${searchType}` : ""
            }`
          ),
        ]);

        results.push(search as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>);

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

          if (llm.ok) {
            data.llmResult = (await llm.text()) ?? llm.json();
          }

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
      providesTags: ["SEARCH"],
    }),

    searchFilter: builder.query<any, any>({
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

    searchAssit: builder.query<SearchSuggestion, any>({
      query: (query) => `/query-assist/suggest?q=${query}&limit=7`,
    }),

    searchTrending: builder.query<any, any>({
      query: () => `/query-assist/trending?limit=7`,
    }),
    semantic_search: builder.query<TSearchResultDocuments | TSearchResultClassifier, string>({
      query: (query) => `/semantic/search?query=${query}&format=markdown`,
      // providesTags: (result, error, arg) => [{ type: 'SemanticSearch', id: arg }],
      providesTags: (result) =>
        result
          ? [
            { type: "SemanticSearch", id: "LIST" },
            ...Object.entries(result)?.map((item, idx) => ({ type: "SemanticSearch" as const, id: `SemanticSearch${idx}` })),
          ]
          : [{ type: "SemanticSearch", id: "LIST" }],

    }),

    llm_search: builder.query<string, {markdown:string}>({
      queryFn: async (question, _api, _extraOptions, _baseQuery) => {
        try {
          const response = await fetch(
            `${baseURL}/ask?question=${encodeURIComponent(
              question
            )}&format=markdown`
          );

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data: await response.json(),
              },
            };
          }

          const markdown = await response.json;
          return { data: (markdown as {markdown: string})?.markdown};
        } catch (err: any) {
          return {
            error: {
              status: 'FETCH_ERROR',
              data: undefined,
              error: err.message ?? 'Network error',
            },
          };
        }
      },
      providesTags: (result, error, arg) => [{ type: 'LlmSearch', id: arg }],

    }),
    query_route_classifier: builder.query<{
      query: string,
      classification: string
    }, string>({
      query: (query) => (
        `/query_routing?query=${query}`

      ),

    }),
  }),
  overrideExisting: true,
});

export const {
  useSearchAssitQuery,
  useSearchFilterQuery,
  useSearchQuery,
  useSearchTrendingQuery,
  usePrefetch,
  useSemantic_searchQuery,
  useLlm_searchQuery,
  // useLlm_searchMutation,
  useQuery_route_classifierQuery,
  util: searchQueryUtil
  // useLlm_searchQuery
} = searchQueryAPI;
