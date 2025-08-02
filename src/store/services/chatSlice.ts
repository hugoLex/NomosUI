import { injectEndpoints } from "./endpoints";

import {
    GenericObject,
    LegalAnalysisLLMResponse,

    SearchResultDocumentMetaDocType,
    SearchSuggestion,

} from "@app/types";
import { baseURL } from "@app/utils";
import { LegalBriefApiResponse } from "@app/types/briefanalyzer";
import { LegalSearchResponse } from "@app/types/similarity";

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




        fetch_chat: builder.query<SearchSuggestion, any>({
            query: (query) => `/query-assist/suggest?q=${query}&limit=7`,
        }),


        chat_enpoint: builder.mutation<{}, { content: string }>({
            // http://webapp.lexanalytics.ai/api/semantic/similar
            query: (payload) => ({
                url: `/semantic/similar`,
                method: "POST",
                body: { ...payload }
            })
        }),



        llm_search: builder.query<LegalAnalysisLLMResponse, string>({
            // llm_search: builder.query<{ markdown: string } | string, string>({
            query: (question) => (
                `${baseURL}/ask?question=${encodeURIComponent(
                    question
                )}`
                // &format=markdown`

            ),
            providesTags: (result, error, arg) => [{ type: 'LlmSearch', id: arg }],

        }),



        brief_analyzer: builder.mutation<LegalBriefApiResponse, string>({
            query: (brief) => ({
                // url: `https://webapp.lexanalytics.ai/api/generate-brief`,
                url: `${baseURL}/generate-brief`,
                method: "POST",
                body: {
                    "case_description": brief, "include_optional_sections": true
                }
            }


            ),

        }),
    }),
    overrideExisting: true,
});

export const {
    useFetch_chatQuery,
    usePrefetch,
    useChat_enpointMutation,
    useLlm_searchQuery,
    useBrief_analyzerMutation,
} = searchQueryAPI;
