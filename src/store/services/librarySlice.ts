import { injectEndpoints } from "./endpoints";

export const libraryAPISlice = injectEndpoints({
  endpoints: (builder) => ({
    getCases: builder.query<any, any>({
      query: ({ page, court, year }) => {
        const paramPage = page ? `?page=${page}` : "";
        const paramCourt = court ? `&court=${court}` : "";
        const paramYear = year ? `&year=${year}` : "";
        const query = `/cases/list${paramPage.trim()}${paramCourt.trim()}${paramYear.trim()}`;
        return query;
      },
      providesTags: ["CASES"],
    }),

    getArticles: builder.query<any, any>({
      query: () => "/articles/list",
    }),

    getArticle: builder.query<any, any>({
      query: (id: string) => `/articles/detail/${id}`,
    }),

    getLegislations: builder.query<any, any>({
      query: ({ page, year, status }) => {
        const paramPage = page ? `?page=${page}` : "";
        const paramCourt = year ? `&court=${year}` : "";
        const paramStatus = status ? `&legislation_status=${status}` : "";
        const query = `/legislation/list${paramPage.trim()}${paramCourt.trim()}${paramStatus.trim()}`;
        return query;
      },
    }),

    getLegislation: builder.query<any, any>({
      query: (id: string) => `/legislation/details/${id}`,
    }),
  }),
});

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
  useGetCasesQuery,
  useGetLegislationQuery,
  useGetLegislationsQuery,
} = libraryAPISlice;
