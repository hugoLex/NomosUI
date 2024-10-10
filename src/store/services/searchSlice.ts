import { AIResult, CaseResults, ListResponse, SearchResult } from "@app/types";
import { injectEndpoints } from "./endpoints";

interface SearchQuery {
  query: string;
  pageNumber: number | null;
}

export const searchQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    articlesSearch: builder.query<SearchResult, SearchQuery>({
      query: ({ query, pageNumber }) => {
        return {
          url: `semanticsearch/api/semantic/search?query=${query}${
            pageNumber ? `&page=${pageNumber}&size=5` : ""
          }`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["ARTICLES"],
    }),
    casesSearch: builder.query<CaseResults, SearchQuery>({
      query: ({ query, pageNumber }) => {
        return {
          url: `semanticsearch/api/semantic/search?query=${query}${
            pageNumber ? `&page=${pageNumber}&size=5` : ""
          }`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["CASES"],
    }),
    casesFilter: builder.query<any, any>({
      query: ({ id, court, year, area_of_law }) => {
        const applyCourt = court ? `&court=${court}` : "";
        const applyYear = year ? `&${year}` : "";
        const appyAreaOfLaw = area_of_law ? `&${area_of_law}` : "";
        const filters = `${applyCourt}${applyYear}${appyAreaOfLaw}`;
        return {
          url: `semanticsearch/api/semantic/filter?search_id=${id}${filters}`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        };
      },
    }),
    legislationsSearch: builder.query<SearchResult, SearchQuery>({
      query: ({ query, pageNumber }) => {
        return {
          url: `semanticsearch/api/semantic/search?query=${query}${
            pageNumber ? `&page=${pageNumber}&size=5` : ""
          }`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["LEGISLATIONS"],
    }),
    LLMSearch: builder.query<AIResult, string>({
      query: (query) => {
        return {
          url: `llmsearch/api/ask?question=${query}`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["CASES"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useArticlesSearchQuery,
  useCasesFilterQuery,
  useCasesSearchQuery,
  useLegislationsSearchQuery,
  useLLMSearchQuery,
  usePrefetch,
} = searchQueryAPI;
