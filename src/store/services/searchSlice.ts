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
          url: `/articles/search?query=${query}${
            pageNumber ? `&page=${pageNumber}&size=5` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["ARTICLES"],
    }),
    casesSearch: builder.query<CaseResults, SearchQuery>({
      query: ({ query, pageNumber }) => {
        return {
          url: `/semantic/search?query=${query}${
            pageNumber ? `&page=${pageNumber}&size=5` : ""
          }`,
          method: "GET",
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
          url: `/semantic/filter?search_id=${id}${filters}`,
          method: "GET",
        };
      },
    }),
    legislationsSearch: builder.query<SearchResult, SearchQuery>({
      query: ({ query, pageNumber }) => ({
        url: `/legislation/search?query=${query}${
          pageNumber ? `&page=${pageNumber}&size=5` : ""
        }`,
      }),
      providesTags: ["LEGISLATIONS"],
    }),
    LLMSearch: builder.query<AIResult, string>({
      query: (query) => ({
        url: `/ask?question=${query}`,
      }),
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
