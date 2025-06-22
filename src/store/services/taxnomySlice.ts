import { injectEndpoints } from "./endpoints";

export const taxonomyQueryAPI = injectEndpoints({
  endpoints: (builder) => ({
    getTaxonomyStructure: builder.query<any, any>({
      query: () => "/taxonomy/structure",
    }),
    getTaxonomyDocument: builder.query<any, string>({
      query: (id) => `/taxonomy/documents/${id}`,
    }),
  }),
});

export const { useGetTaxonomyDocumentQuery, useGetTaxonomyStructureQuery } =
  taxonomyQueryAPI;
