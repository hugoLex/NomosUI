import axios from "axios";
import { aiURL, searchURL } from "../constants";
import { AIResult, SearchResult } from "@app/types";

export const endpointSearch = axios.create({
  baseURL: searchURL,

  headers: {
    "Content-Type": "application/json",
  },
});

export const endpointAI = axios.create({
  baseURL: aiURL,

  headers: {
    "Content-Type": "application/json",
  },
});

export const searchService = async (query: string, pageNumber?: number) => {
  let llm: AIResult | null = null,
    search: SearchResult[] | null = null;

  const [llmResponse, searchResponse] = await Promise.all([
    endpointAI.get(`/ask?question=${query}`),
    pageNumber
      ? await endpointSearch.get(`/search?query=${query}`)
      : await endpointSearch.get(`/search?query=${query}&page=${pageNumber}`),
  ]);

  if (llmResponse.status === 200) llm = llmResponse.data as AIResult;

  if (searchResponse.status === 200)
    search = searchResponse.data as SearchResult[];

  return { llm, search };
};
