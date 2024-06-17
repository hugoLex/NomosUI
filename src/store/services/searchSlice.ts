import { ListResponse, SearchResult } from "@app/types";
import { injectEndpoints } from "./endpointSearch";

interface SearchQuery {
  query: string;
  pageNumber: string;
}

export const searchQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    searchCases: builder.query<{ documents: SearchResult[] }, SearchQuery>({
      query: ({ query, pageNumber }) => {
        return {
          url: `/search?query=${query}${
            pageNumber ? `&page=${pageNumber}` : ""
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
  }),
  overrideExisting: true,
});

export const { useSearchCasesQuery, usePrefetch } = searchQueryAPI;
