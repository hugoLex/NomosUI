// hooks/useTaxonomyData.ts
import { useState, useEffect } from "react";

interface TaxonomyData {
  loading: boolean;
  error: string | null;
  taxonomyTree: any;
  selectedAreaDetails: any;
  documentDetails: any;
}

export const useTaxonomyData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taxonomyTree, setTaxonomyTree] = useState(null);
  const [selectedAreaDetails, setSelectedAreaDetails] = useState(null);
  const [documentDetails, setDocumentDetails] = useState(null);

  // Fetch initial taxonomy structure
  const fetchTaxonomyStructure = async () => {
    try {
      const response = await fetch("/api/taxonomy/structure");
      if (!response.ok) throw new Error("Failed to fetch taxonomy structure");
      const data = await response.json();
      setTaxonomyTree(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch documents for a specific taxonomy node
  const fetchTaxonomyDocuments = async (
    taxonomyId: number,
    page: number = 1,
    scope: string = "direct"
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/taxonomy/documents/${taxonomyId}?page=${page}&scope=${scope}`
      );
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data = await response.json();
      setDocumentDetails(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxonomyStructure();
  }, []);

  return {
    loading,
    error,
    taxonomyTree,
    documentDetails,
    fetchTaxonomyDocuments,
  };
};
