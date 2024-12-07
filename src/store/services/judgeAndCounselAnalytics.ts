//   import {
//       fetchBaseQuery,
//     type FetchBaseQueryError,
//     type FetchBaseQueryMeta,
//   } from "@reduxjs/toolkit/query";
import { lexGateWayApiSlice } from "../baseApi/lexgatewayApi";
  
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
type GetUserAppearancesRequest = {
    judge_id: number;  // judge_id is a number that identifies the judge
 page:number };
    

  export const judgeCounselAnalyticsAPISlice = lexGateWayApiSlice.injectEndpoints({
    endpoints: (builder) => ({
 getJudgeAnalytics: builder.query<UserAppearancesResponse, GetUserAppearancesRequest>({
        query: ({ judge_id,page  }) => `/judge_appearance/${judge_id}?page=${page}`,
        //     {
        //   return {
        //     url: `/judge_appearance/${judge_id}?page=${page}`,
        //   };
        // },  
        providesTags:["Analytics"],
      }),
    }),
  });
  
  export const { useGetJudgeAnalyticsQuery, usePrefetch } =
    judgeCounselAnalyticsAPISlice;
  