export interface SearchResult {
  id: string;
  type: "job" | "resource" | "mentor";
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  relevance: number;
}
