// Core interfaces for legal brief data structure

interface legal_brief {
    case_overview: {
        parties: {
            name: string;
            role: 'Defendant' | 'Prosecution' | string;
        }[];
        court: string;
        case_reference: string;
    };
    summary: string;
    facts: string[];
    jurisdiction: string;
    issues: {
        description: string;
        category: 'procedural' | 'substantive' | string;
    }[];
    plaintiff_claims: {
        assertion: string;
        strength: 'WEAK' | 'NEUTRAL' | 'STRONG' | string;
        strengths: string[];
        weaknesses: string[];
    }[];
    defendant_claims: {
        assertion: string;
        strength: 'WEAK' | 'NEUTRAL' | 'STRONG' | string;
        strengths: string[];
        weaknesses: string[];
    }[];
    prayers: {
        plaintiff: string[];
        defendant: string[];
        [key: string]: string[]
    };
    evidence: string[];
    precedents: string[];
    legislation: string[];
    legal_arguments: {
        plaintiff: string[];
        defendant: string[];
    };
    risk_analysis: {
        plaintiff: string[];
        defendant: string[];

    };
    reading_list: string[];
    markdown_brief: string;
};



// API response wrapper
export interface ApiResponse<T> {
    legal_brief: T;
    processing_time: number;
    cache_hit: boolean;
    timestamp?: string;
    version?: string;
    markdown_brief?: string
}
// Specific API response type
export type LegalBriefApiResponse = ApiResponse<legal_brief>;



