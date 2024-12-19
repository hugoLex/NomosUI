//   import {
//       fetchBaseQuery,
//     type FetchBaseQueryError,
//     type FetchBaseQueryMeta,
//   } from "@reduxjs/toolkit/query";
import { lexGateWayApiSlice } from "../baseApi/lexgatewayApi";
import {
  CounselProfileResponse,
  CounselResponseT,
  GetCounselAppearancesRequest,
  AllJudgesListResponseT,
  JudgeProfileResponseT,
  CounselDetailT,
} from "./types";

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
  page: number;
};



export const judgeCounselAnalyticsAPISlice = lexGateWayApiSlice.injectEndpoints(
  {
    endpoints: (builder) => ({
      getAllJudge: builder.query<
        AllJudgesListResponseT,
        Omit<RequestParams, "judge_id">
      >({
        query: ({ page }) => `/judges/list?page=${page}`,
        providesTags: ["Analytics", "Judge"],
      }),
      getJudgeAnalytics: builder.query<JudgeProfileResponseT, RequestParams>({
        query: ({ judge_id }) =>
          `/judges/detail/${judge_id}`,
        providesTags: ["Analytics", "Judge"],
      }),
      getAllCounsel: builder.query<
        CounselResponseT,
        Omit<GetCounselAppearancesRequest, "counsel_id">
      >({
        query: ({ page }) => `/counsels/list?page=${page}`,
        providesTags: ["Analytics", "Counsel"],
      }),

      getCounselAnalytics: builder.query<
        CounselDetailT,
        GetCounselAppearancesRequest
      >({
        query: ({ counsel_id, page }) =>
          `/counsels/detail/${counsel_id}`,
        // query: ({ counsel_id,page  }) => `/counsel_appearance/${counsel_id}?page=${page}`,
        //     {https://lexgateway.lexanalytics.ai/counsel_consolidated/80
        //   return {
        //     url: `/counsel_appearance/${counsel_id}?page=${page}`,
        //   };
        // },
        providesTags: ["Analytics", "Counsel"],
      }),
    }),
  }
);

export const {
  useGetJudgeAnalyticsQuery,
  useGetCounselAnalyticsQuery,
  useGetAllCounselQuery,
  useGetAllJudgeQuery,
} = judgeCounselAnalyticsAPISlice;
// GET /api/judges/list                    # Get all judges
// GET /api/judges/list?page=1&court_id=1&year=2023  # With filters
// GET /api/judges/detail/{judge_id}       # Get specific judge details

// GET /api/counsels/list                  # Get all counsels
// GET /api/counsels/list?page=1&court_id=1&year=2023  # With filters
// GET /api/counsels/detail/{counsel_id}   # Get specific counsel details