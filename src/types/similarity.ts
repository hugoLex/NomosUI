// Base interfaces for pagination and search results
interface Pagination {
    page: number;
    page_size: number;
    total_results: number;
    total_pages: number;
}

// Enum for rhetorical functions
enum RhetoricalFunction {
    LEGAL_REASONING = "legal reasoning",
    FACTS = "facts",
    PROCEDURAL_HISTORY = "procedural history",
    HOLDING = "holding",
    DICTUM = "dictum"
}

// Enum for document types
// enum DocumentType {
//   CASE = "case",
//   LEGISLATION = "legislation",
//   ARTICLE = "article",
//   PRINCIPLE = "principle",
//   UNKNOWN = "unknown"
// }

// Base chunk interface - common properties for all chunk types
export interface BaseChunk {
    document_id: string;
    chunk_id: string;
    case_title: string;
    rhetorical_function: RhetoricalFunction;
    excerpt_notes: string;
    court: string;
    suit_number: string;
    year: string;
    content: string;
    similarity_score: number;
    document_type: DocumentType;
}

// Related chunk interface (extends base chunk)
export interface RelatedChunk extends BaseChunk { }

// Case chunk interface (same as base chunk for now, but separated for extensibility)
interface CaseChunk extends BaseChunk { }

// Results per document type interface
interface ResultsPerDocumentType {
    case?: number;
    legislation?: number;
    article?: number;
    principle?: number;
    unknown?: number;
}

// Main API response interface
export interface LegalSearchResponse {
    pagination: Pagination;
    related_chunks: RelatedChunk[];
    cases: CaseChunk[];
    principles: any[]; // Currently empty, can be typed more specifically when structure is known
    legislations: any[]; // Currently empty, can be typed more specifically when structure is known
    articles: any[]; // Currently empty, can be typed more specifically when structure is known
    unknowns: any[]; // Currently empty, can be typed more specifically when structure is known
    results_per_document_type: ResultsPerDocumentType;
}