export type TaxonomyDocument = {
  doc_type: string;
  document_id: string;
  hierarchy_level: string;
  source_data: string | { year: number; court: string; citation: string };
  title: string;
};

export type TaxonomyDocuments = {
  documents: TaxonomyDocument[];
  page: number;
  per_page: number;
  scope: string;
  taxonomy_id: number;
  taxonomy_type: string;
  total_count: number;
};

export type Taxonomy = {
  document_breakdown: string;
  hierarchy_path: string;
  id: number;
  level: number;
  name: string;
  parent_id: number;
  total_documents: number;
  type: string;
  children?: Taxonomy[];
};

export type MappedTx = {
  id: string | number;
  name: string;
  document_breakdown?: any;
  children: Taxonomy[];
};

export type TaxonomyDocumentPanel = {
  id: React.Key | null | undefined;
  url: string;
  type: any;
  title: string;
  summary: string;
  citation: string;
  year: string | number;
};
