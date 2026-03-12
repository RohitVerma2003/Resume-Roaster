import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { RoastData } from '../types';

interface TerminalRoastModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  roastData: RoastData | null;
  onDownload?: () => void;
  onRoastAnother?: () => void;
}

const TerminalRoastModal: React.FC<TerminalRoastModalProps> = ({
  isOpen,
  onClose,
  loading,
  roastData,
  onDownload,
  onRoastAnother
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingPaused, setIsTypingPaused] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear all timeouts helper
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // Loading animation lines
  const loadingLines = useMemo(() => [
    "$ uploading resume.pdf...",
    "$ parsing document structure...",
    "$ scanning ATS compatibility...",
    "$ contacting recruiter AI...",
    "$ initializing roast engine...",
    "$ generating brutal feedback...",
    "$ preparing results..."
  ], []);

  // Format the roast data into terminal-style lines with sections - MEMOIZED
  const formattedLines = useMemo(() => {
    if (!roastData) return [];
    
    const lines: string[] = [];
    
    // Header
    lines.push("$ resume-roast --complete");
    lines.push("────────────────────────────────");
    lines.push("");
    
    // ATS Score Section
    lines.push("📊 ATS SCORE:");
    lines.push(`  ${roastData.atsScore}/100 - ${roastData.atsScore < 60 ? 'Needs Work' : roastData.atsScore < 80 ? 'Average' : 'Excellent'}`);
    lines.push("");
    
    // Summary Roast Section
    lines.push("🔥 EXECUTIVE SUMMARY:");
    lines.push(`  "${roastData.summaryRoast}"`);
    lines.push("");
    
    // Detailed Roasts Section
    lines.push("📝 DETAILED ROASTS:");
    roastData.roasts.forEach(roast => {
      lines.push(`  ▸ ${roast}`);
    });
    lines.push("");
    
    // Issues Section
    lines.push("⚠️ ISSUES DETECTED:");
    roastData.issues.forEach(issue => {
      lines.push(`  • ${issue}`);
    });
    lines.push("");
    
    // Suggestions Section
    lines.push("✨ SUGGESTED IMPROVEMENTS:");
    roastData.suggestions.forEach(suggestion => {
      lines.push(`  → ${suggestion}`);
    });
    lines.push("");
    
    // Improved Summary Section
    lines.push("📄 IMPROVED SUMMARY:");
    lines.push(`  ${roastData.improvedSummary}`);
    lines.push("");
    lines.push("────────────────────────────────");
    lines.push("$ _");
    
    return lines;
  }, [roastData]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Handle key press to continue after pauses
  useEffect(() => {
    const handleKeyPress = () => {
      if (isTypingPaused) {
        setIsTypingPaused(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTypingPaused]);

  // Typing animation for loading state
  useEffect(() => {
    if (!isOpen) {
      clearAllTimeouts();
      setDisplayedLines([]);
      setCurrentSection(0);
      setCurrentLineIndex(0);
      setHasStartedTyping(false);
      return;
    }

    // Only run loading animation if we're actually loading
    if (loading) {
      setHasStartedTyping(false); // Reset typing flag when loading starts
      if (currentSection < loadingLines.length) {
        const timer = setTimeout(() => {
          setDisplayedLines(prev => [...prev, loadingLines[currentSection]]);
          setCurrentSection(prev => prev + 1);
          
          // Auto-scroll to bottom
          if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
          }
        }, 400);

        timeoutsRef.current.push(timer);

        return () => {
          clearAllTimeouts();
        };
      }
    }
  }, [isOpen, loading, currentSection, loadingLines, clearAllTimeouts]);

  // Start typing animation when loading completes and we have data
  useEffect(() => {
    if (!isOpen) return;
    
    // When loading finishes and we have data, reset and start typing
    if (!loading && roastData && !hasStartedTyping) {
      clearAllTimeouts();
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      setHasStartedTyping(true);
    }
  }, [loading, roastData, hasStartedTyping, isOpen, clearAllTimeouts]);

  // Typing animation for results
  useEffect(() => {
    // Only run if we're not loading, have data, and typing hasn't completed
    if (!isOpen || loading || !roastData || !hasStartedTyping) {
      return;
    }
    
    if (isTypingPaused) return;

    if (currentLineIndex < formattedLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, formattedLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
        
        // Auto-scroll to bottom
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      }, 30); // Slightly faster typing speed

      timeoutsRef.current.push(timer);

      return () => {
        clearAllTimeouts();
      };
    }
  }, [isOpen, loading, roastData, formattedLines, currentLineIndex, isTypingPaused, hasStartedTyping, clearAllTimeouts]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      clearAllTimeouts();
      setDisplayedLines([]);
      setCurrentSection(0);
      setCurrentLineIndex(0);
      setIsTypingPaused(false);
      setHasStartedTyping(false);
    }
  }, [isOpen, clearAllTimeouts]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (onDownload) onDownload();
  };

  const handleRoastAnother = () => {
    clearAllTimeouts();
    setDisplayedLines([]);
    setCurrentSection(0);
    setCurrentLineIndex(0);
    setIsTypingPaused(false);
    setHasStartedTyping(false);
    if (onRoastAnother) onRoastAnother();
  };

  const handleContinue = () => {
    if (isTypingPaused) {
      setIsTypingPaused(false);
    }
  };

  const isLoading = loading;
  const showLoadingUI = isLoading && !roastData;
  const showResultsUI = !isLoading && roastData && hasStartedTyping;
  const isTypingComplete = !isLoading && roastData && currentLineIndex >= formattedLines.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300">
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#050f05] border-2 border-[#00FF41] rounded-lg shadow-[0_0_50px_#00FF4115,inset_0_0_60px_#00080060] overflow-hidden animate-modalSlideIn"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border-b border-[#00FF4120]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          </div>
          <span className="text-[#333] ml-2 text-[10px] font-mono truncate">
            resume_roaster@hackermachine:~/roast$ ./analyze --verbose
          </span>
          <button
            onClick={onClose}
            className="ml-auto text-[#333] hover:text-[#00FF41] transition-colors duration-200 text-lg font-mono"
          >
            ×
          </button>
        </div>

        {/* Terminal Content */}
        <div
          ref={contentRef}
          className="p-4 overflow-y-auto max-h-[calc(80vh-100px)] font-mono text-[12px] leading-relaxed scrollbar-thin scrollbar-thumb-[#00FF41]/30 scrollbar-track-transparent"
          style={{ backgroundColor: '#050f05' }}
          onClick={handleContinue}
        >
          {showLoadingUI ? (
            // Loading State
            <div className="space-y-1">
              {displayedLines.map((line, index) => (
                <div
                  key={index}
                  className="text-[#00FF41] animate-fadeIn whitespace-pre-wrap"
                >
                  {line}
                </div>
              ))}
              {currentSection < loadingLines.length && (
                <div className="text-[#00FF41]">
                  {showCursor ? '█' : ''}
                </div>
              )}
              {currentSection === loadingLines.length && (
                <div className="text-[#00FF41] animate-pulse mt-2">
                  $ processing... {showCursor && '█'}
                </div>
              )}
            </div>
          ) : showResultsUI && (
            // Results State
            <div className="space-y-0.5">
              {displayedLines.map((line, index) => {
                // Apply different colors based on content
                let color = "#00FF41";
                if (line.includes("ATS SCORE")) color = "#FFB800";
                if (line.includes("ISSUES DETECTED") || line.includes("•")) color = "#FF4444";
                if (line.includes("SUGGESTED IMPROVEMENTS") || line.includes("→")) color = "#00FF9C";
                if (line.includes("DETAILED ROASTS") || line.includes("▸")) color = "#00FF41";
                if (line.includes("IMPROVED SUMMARY")) color = "#00FF9C";
                if (line.includes("────────────────")) color = "#1a3a1a";
                
                // Add indentation for bullet points
                const isBullet = line.startsWith("  ▸") || line.startsWith("  •") || line.startsWith("  →");
                
                return (
                  <div
                    key={index}
                    style={{ color }}
                    className={`${isBullet ? 'ml-4' : ''} animate-fadeIn whitespace-pre-wrap`}
                  >
                    {line}
                  </div>
                );
              })}
              
              {/* Blinking cursor during typing */}
              {currentLineIndex < formattedLines.length && (
                <span className="text-[#00FF41]" style={{ opacity: showCursor ? 1 : 0 }}>█</span>
              )}
              
              {/* Final cursor when complete */}
              {isTypingComplete && (
                <span className="text-[#00FF41] inline-block mt-1" style={{ opacity: showCursor ? 1 : 0 }}>█</span>
              )}
            </div>
          )}
        </div>

        {/* Terminal Footer with Buttons */}
        {isTypingComplete && (
          <div className="flex justify-end gap-3 px-4 py-3 bg-[#0a0a0a] border-t border-[#00FF4120]">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-transparent border border-[#00FF41] text-[#00FF41] rounded font-mono text-[11px] hover:bg-[#00FF41] hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_#00FF41]"
            >
              $ download_improved.sh
            </button>
            <button
              onClick={handleRoastAnother}
              className="px-3 py-1.5 bg-[#00FF41] text-black rounded font-mono text-[11px] hover:bg-[#00CC33] transition-all duration-300 hover:shadow-[0_0_15px_#00FF41]"
            >
              $ roast_another --force
            </button>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 65, 0.3);
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 65, 0.5);
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-modalSlideIn {
          animation: modalSlideIn 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.15s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default TerminalRoastModal;