import { ListResponse } from "@app/types";
import { injectEndpoints } from "./apiSlice";

interface SearchQuery {
  keyword: string;
  pageCount: string;
}

interface SearchResult {
  citations?: string[];
  data?: [];
  judge?: string[];
  judges?: string[];
}

export const searchQueryAPI = injectEndpoints({
  endpoints: (builder) => ({}),
  overrideExisting: true,
});

export const { usePrefetch } = searchQueryAPI;
