//   import {
//       fetchBaseQuery,
//     type FetchBaseQueryError,
//     type FetchBaseQueryMeta,
//   } from "@reduxjs/toolkit/query";

import { endpoints, injectEndpoints } from "./endpoints";
import { baseURL } from "@app/utils";
import {
  CounselProfileResponse,
  CounselResponseT,
  GetCounselAppearancesRequest,
  AllJudgesListResponseT,
  JudgeProfileResponseT,
  CounselDetailT,
} from "@app/types/analytics";

// type for each appearance
type Appearance = {
  case_id: number;
  case_title: string;
  date: string;
  court: string;
  outcome: string;
};

// request parameters type
type RequestParams = {
  judge_id: number; // judge_id is a number that identifies the judge
  page?: number;
};

type ChatwithDocumentRequestBody = {
  query: string;
  document_id: string;
  session_id: string;
}

export const benchAPISlice = injectEndpoints({
  endpoints: (builder) => ({
    getAllJudge: builder.query<
      AllJudgesListResponseT,
      { params: string }
    >({
      query: ({ params }) => {

        // console.log("The query param from judge's endpoint", params)
        return `/judges/search?${params}`
      },
      providesTags: ["Analytics", "Judge"],
    }),

    getJudgeAnalytics: builder.query<JudgeProfileResponseT, RequestParams>({
      query: ({ judge_id }) => `/judges/detail/${judge_id}`,
      providesTags: ["Analytics", "Judge"],
    }),

    getAllCounsel: builder.query<
      CounselResponseT,
      { params: string }
    // Omit<GetCounselAppearancesRequest, "counsel_id">
    >({
      query: ({ params }) => {

        // console.log("The query params", params)
        return `/counsels/list?${params}`
      },
      providesTags: ["Analytics", "Counsel"],
    }),

    getCounselAnalytics: builder.query<
      CounselDetailT,
      GetCounselAppearancesRequest
    >({
      query: ({ counsel_id, page }) => `/counsels/detail/${counsel_id}`,
      // query: ({ counsel_id,page  }) => `/counsel_appearance/${counsel_id}?page=${page}`,
      //     {https://lexgateway.lexanalytics.ai/counsel_consolidated/80
      //   return {
      //     url: `/counsel_appearance/${counsel_id}?page=${page}`,
      //   };
      // },
      providesTags: ["Analytics", "Counsel"],
    }),

    chatWithDocument: builder.query<string, ChatwithDocumentRequestBody>({
      async queryFn(arg, api, extraOptions, baseQuery) {
        // baseQuery here is actually baseQueryWithReauth (from the API config)
        const controller = new AbortController();
        // 1. Use baseQueryWithReauth to prepare headers (and refresh tokens if needed)
        const dummyRequest = {
          url: '/chatbot/chat',
          method: 'POST',
          body: arg,
        };
        // You need headers from baseQueryWithReauth
        const dummyResult = await baseQuery(dummyRequest,
          //  api, extraOptions

        );

        // If the dummy result returns a response, headers are valid and tokens are fresh
        // BUT we discard the response because we want to handle streaming manually
        if (dummyResult.error) {
          return { error: dummyResult.error };
        }

        const headers = new Headers();
        const preparedHeaders = await (baseQuery as any).prepareHeaders?.(headers, {
          getState: api.getState,
        });

        // Now do your fetch manually with those headers (for streaming)
        const stream = new ReadableStream({
          start(controllerStream) {
            fetch(`${baseURL}/chatbot/chat`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...Object.fromEntries(preparedHeaders?.entries?.() ?? []),
              },
              body: JSON.stringify(arg),
              signal: controller.signal,
            }).then((response) => {
              const reader = response.body?.getReader();
              const decoder = new TextDecoder('utf-8');

              const read = async () => {
                if (!reader) return;
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) {
                    controllerStream.close();
                    break;
                  }
                  const chunk = decoder.decode(value, { stream: true });
                  controllerStream.enqueue(chunk);
                }
              };

              read().catch((err) => {
                controllerStream.error(err);
              });
            });
          },
        });

        const text = await new Response(stream).text();

        return { data: text };
      },
    }),
    deleteChatWithDocument: builder.mutation<{ session_id: string }, { session_id: string, document_id: string }>({
      query: ({ session_id, document_id }) => ({
        url: `/chatbot/clear`,
        method: 'POST',
        body: { session_id, document_id },
      }),
      // invalidatesTags: ["Analytics", ],
    }),



  }),
});


export const {
  useGetJudgeAnalyticsQuery,
  useGetCounselAnalyticsQuery,
  useGetAllCounselQuery,
  useGetAllJudgeQuery,
  useDeleteChatWithDocumentMutation
} = benchAPISlice;
// GET /api/judges/list                    # Get all judges
// GET /api/judges/list?page=1&court_id=1&year=2023  # With filters
// GET /api/judges/detail/{judge_id}       # Get specific judge details

// GET /api/counsels/list                  # Get all counsels
// GET /api/counsels/list?page=1&court_id=1&year=2023  # With filters
// GET /api/counsels/detail/{counsel_id}   # Get specific counsel details
