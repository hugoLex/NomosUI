import { AIResult, ListResponse } from '@app/types';
import { injectEndpoints } from './endpointAI';

export const searchQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    getAI: builder.query<AIResult, string>({
      query: (query) => {
        return {
          url: `/ask?question=${query}`,
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        };
      },
      providesTags: ['CASES'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAIQuery, usePrefetch } = searchQueryAPI;
