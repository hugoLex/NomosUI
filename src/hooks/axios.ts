import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { baseURL } from '@app/utils';

// Define response data interface
interface SearchResponse {
  results: Array<{
    id: string;
    title: string;
    content: string;
    score: number;
  }>;
  totalResults: number;
}

interface SearchState {
  data: SearchResponse | null;
  isLoading: boolean;
  error: Error | AxiosError | null;
}

/**
 * Custom hook for performing semantic search queries
 * @param initialQuery - Initial search query string (optional)
 * @returns Object containing search state and search function
 */
export function useSemanticSearch(initialQuery?: string) {
  const [query, setQuery] = useState<string | undefined>(initialQuery);
  const [state, setState] = useState<SearchState>({
    data: null,
    isLoading: false,
    error: null
  });

  const performSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response: AxiosResponse<SearchResponse> = await axios.get(
        `${baseURL}/semantic/search?query=${encodeURIComponent(searchQuery)}`,
        // `/semantic/search?query=${encodeURIComponent(searchQuery)}&format=markdown`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setState({
        data: response.data,
        isLoading: false,
        error: null
      });

      return response.data;
    } catch (error) {
      const errorToStore = error instanceof Error ? error : new Error('An unknown error occurred');

      setState({
        data: null,
        isLoading: false,
        error: errorToStore
      });

      throw error;
    }
  }, []);

  // Effect to perform search when initialQuery is provided
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery).catch(err => {
        console.error('Initial search failed:', err);
      });
    }
  }, [initialQuery, performSearch]);

  return {
    query,
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    performSearch
  };
}

// Example usage in a component:
/*
import { useSemanticSearch } from './hooks/useSemanticSearch';

function SearchComponent() {
  const { data, isLoading, error, performSearch } = useSemanticSearch();
  const [inputValue, setInputValue] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(inputValue);
  };
  
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
      
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p>Found {data.totalResults} results</p>
          <ul>
            {data.results.map(result => (
              <li key={result.id}>
                <h3>{result.title}</h3>
                <p>Score: {result.score}</p>
                <div dangerouslySetInnerHTML={{ __html: result.content }} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
*/