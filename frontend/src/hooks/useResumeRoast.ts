import { useState, useCallback } from "react";
import type { RoastData } from "../types";
import { api } from "../services/api";
import toast from "react-hot-toast";

interface UseResumeRoastReturn {
  uploadResume: (file: File) => Promise<void>;
  loading: boolean;
  error: any;
  roastData: RoastData | null;
  uploadProgress: number;
  reset: () => void;
}

export const useResumeRoast = (): UseResumeRoastReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [roastData, setRoastData] = useState<RoastData | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const uploadResume = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await api.post("/roast", formData);

      if (response.data?.success) {
        setRoastData(response.data.data);
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.error || typeof(err?.response?.data) ? err?.response?.data :
        "Error in roasting or may be credits limit exceeded";
        
      toast.error(message);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setRoastData(null);
    setError(null);
    setUploadProgress(0);
    setLoading(false);
  }, []);

  return {
    uploadResume,
    loading,
    error,
    roastData,
    uploadProgress,
    reset,
  };
};
