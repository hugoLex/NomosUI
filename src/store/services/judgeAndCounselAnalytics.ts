//   import {
//       fetchBaseQuery,
//     type FetchBaseQueryError,
//     type FetchBaseQueryMeta,
//   } from "@reduxjs/toolkit/query";
import { lexGateWayApiSlice } from "../baseApi/lexgatewayApi";
import {
  CounselProfileResponse,
  CounselResponse,
  GetCounselAppearancesRequest,
  JudgeInfoResponseT,
} from "./types";

// type for each appearance
type Appearance = {
  case_id: number;
  case_title: string;
  date: string;
  court: string;
  outcome: string;
};

// type for the response
type UserAppearancesResponse = {
  judge_id: number;
  appearances: Appearance[];
};
// request parameters type
type RequestParams = {
  judge_id: number; // judge_id is a number that identifies the judge
  page: number;
};

// Type for the case appearance information
type CaseAppearance = {
  case_title: string; // case_title is a string
  suit_number: string; // suit_number is a string
  year: number; // year is a number
  court: string; // court is a string
  division: string | null; // division is either a string or null
  stance: string | null; // stance is either a string or null
  subject_matters: string[]; // subject_matters is an array of strings
};

// Type for the statistics information
type JudgeStatistics = {
  total_cases: number; // total_cases is a number
  courts_served: string[]; // courts_served is an array of strings
  divisions_served: string[]; // divisions_served is an array of strings
  subject_matters: string[]; // subject_matters is an array of strings
};

// Type for the judge information
type JudgeInfo = {
  judge_id: number; // judge_id is a number
  name: string; // name is a string
  profile: string; // profile is a string
  statistics: JudgeStatistics; // statistics is of type JudgeStatistics
  case_appearances: {
    total: number; // total is a number
    page: number; // page is a number
    cases: CaseAppearance[]; // cases is an array of CaseAppearance
  };
};

// Type for the overall structure
type JudgeProfileResponse = {
  user_id: string; // user_id is a string (e.g., 'anonymous')
  judge_info: JudgeInfo; // judge_info is of type JudgeInfo
};

export const judgeCounselAnalyticsAPISlice = lexGateWayApiSlice.injectEndpoints(
  {
    endpoints: (builder) => ({
      getAllJudge: builder.query<
        JudgeInfoResponseT,
        Omit<RequestParams, "judge_id">
      >({
        query: ({ page }) => `/retrieve_all_judges`,
        providesTags: ["Analytics", "Judge"],
      }),
      getJudgeAnalytics: builder.query<JudgeProfileResponse, RequestParams>({
        query: ({ judge_id, page }) =>
          `/consolidated_judge/${judge_id ?? 80}?page=${page}`,
        providesTags: ["Analytics", "Judge"],
      }),
      getAllCounsel: builder.query<
        CounselResponse,
        Omit<GetCounselAppearancesRequest, "counsel_id">
      >({
        query: ({ page }) => `/get_all_counsels`,
        providesTags: ["Analytics", "Counsel"],
      }),

      getCounselAnalytics: builder.query<
        CounselProfileResponse,
        GetCounselAppearancesRequest
      >({
        query: ({ counsel_id, page }) =>
          `/counsel_consolidated/${counsel_id}?page=${page}`,
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
