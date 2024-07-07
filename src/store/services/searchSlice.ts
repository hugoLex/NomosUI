import { ListResponse, SearchResult } from "@app/types";
import { injectEndpoints } from "./endpointSearch";

interface SearchQuery {
  query: string;
  pageNumber: string;
}

export const searchQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    searchCases: builder.query<SearchResult, SearchQuery>({
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
    filterCases: builder.query<any, any>({
      query: ({ id, court, year, area_of_law }) => {
        const applyCourt = court ? `&court=${court}` : "";
        const applyYear = year ? `&${year}` : "";
        const appyAreaOfLaw = area_of_law ? `&${area_of_law}` : "";
        const filters = `${applyCourt}${applyYear}${appyAreaOfLaw}`;
        return {
          url: `/filter?search_id=${id}${filters}`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useFilterCasesQuery, useSearchCasesQuery, usePrefetch } =
  searchQueryAPI;
