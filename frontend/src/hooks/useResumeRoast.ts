import { useState, useCallback } from 'react';
import type { ApiResponse, RoastData } from '../types';


interface UseResumeRoastReturn {
  uploadResume: (file: File) => Promise<void>;
  getRoastData: (fileId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  roastData: RoastData | null;
  uploadProgress: number;
  reset: () => void;
}

export const useResumeRoast = (): UseResumeRoastReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [roastData, setRoastData] = useState<RoastData | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Simulate upload progress
  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return interval;
  };

  const uploadResume = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    
    const progressInterval = simulateProgress();

    try {
      // Create form data
      const formData = new FormData();
      formData.append('resume', file);

      // Simulate API call - replace with actual API endpoint
      // const response = await fetch('/api/upload-resume', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error('Upload failed');
      // }

      // const data: UploadResponse = await response.json();

      // Simulate successful upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Simulate getting roast data after upload
      await getRoastData('mock-file-id');
      
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : 'Upload failed');
      setLoading(false);
    }
  }, []);

  const getRoastData = useCallback(async (fileId: string) => {
    try {
      // Simulate API call - replace with actual API endpoint
      // const response = await fetch(`/api/roast/${fileId}`);
      // const data: ApiResponse = await response.json();

      // Mock data based on the API response demo
      const mockData: ApiResponse = {
        message: "Success",
        data: {
          atsScore: 65,
          summaryRoast: "Rohit Verma's resume is like a Bollywood movie—lots of action, but some scenes are just filler. Let's cut to the chase.",
          roasts: [
            "Education section is as exciting as a PowerPoint presentation on 'The History of Paperclips.' GPA? Meh. Where's the spice?",
            "Experience section: 'Developed and scaled a full-stack HealthTech platform'—cool, but did it cure cancer? Give us metrics or GTFO.",
            "Projects: 'PrepPilot 2' sounds like a rejected startup name from Shark Tank. Also, 'cheat-proof backend-only state'—bold claim. Prove it.",
            "Skills: 'C, C++, JavaScript, TypeScript'—so, you’re basically a walking programming language dictionary. But can you actually build something useful?",
            "Achievements: 'Top 22% problem solver on LeetCode'—so, 78% are better? Ouch."
          ],
          issues: [
            "No quantifiable impact in experience section (e.g., 'reduced manual ops by 40%' is vague—40% of what?).",
            "Projects lack real-world deployment links or user metrics (e.g., '100+ daily active users'—where’s the proof?).",
            "Skills section is a laundry list. Prioritize what’s relevant to the job you’re applying for.",
            "Formatting is inconsistent (e.g., 'Databases:MongoDB'—missing space, seriously?).",
            "No GitHub/Live links for projects. Are they real or just figments of your imagination?"
          ],
          suggestions: [
            "Add metrics everywhere. Did your HealthTech platform save lives or just lines of code?",
            "Trim the skills list. Nobody cares if you know HTML5 unless you’re applying to a 2005 web dev job.",
            "Include GitHub/Live project links. Show, don’t tell.",
            "Fix formatting. A missing space is the difference between 'Databases:MongoDB' and 'Databases: MongoDB' (and sanity).",
            "Rewrite the summary to highlight unique value. 'Full-stack dev who actually ships products' > 'I know C++.'"
          ],
          improvedSummary: "Full-stack developer with a knack for building (and scaling) real-world applications. Proven track record of reducing operational overhead by 40% and creating tools used by 100+ daily active users. LeetCode warrior (top 22%), but prefers shipping code over solving hypothetical problems. Let’s build something that doesn’t suck."
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRoastData(mockData.data);
      setLoading(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get roast data');
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
    getRoastData,
    loading,
    error,
    roastData,
    uploadProgress,
    reset
  };
};