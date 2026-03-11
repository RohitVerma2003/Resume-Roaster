export interface RoastData {
  atsScore: number;
  summaryRoast: string;
  roasts: string[];
  issues: string[];
  suggestions: string[];
  improvedSummary: string;
}

export interface ApiResponse {
  message: string;
  data: RoastData;
}

export interface UploadResponse {
  success: boolean;
  fileId?: string;
  error?: string;
}