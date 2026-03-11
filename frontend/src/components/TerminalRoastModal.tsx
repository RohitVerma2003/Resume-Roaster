import React, { useState, useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Loading animation lines
  const loadingLines = [
    "$ uploading resume.pdf...",
    "$ parsing document structure...",
    "$ scanning ATS compatibility...",
    "$ contacting recruiter AI...",
    "$ initializing roast engine...",
    "$ generating brutal feedback...",
    "$ preparing results..."
  ];

  // Format the roast data into terminal-style lines with sections
  const getFormattedLines = (data: RoastData): string[] => {
    const lines: string[] = [];
    
    // Header
    lines.push("$ resume-roast --complete");
    lines.push("────────────────────────────────");
    lines.push("");
    
    // ATS Score Section
    lines.push("📊 ATS SCORE:");
    lines.push(`  ${data.atsScore}/100 - ${data.atsScore < 60 ? 'Needs Work' : data.atsScore < 80 ? 'Average' : 'Excellent'}`);
    lines.push("");
    
    // Summary Roast Section
    lines.push("🔥 EXECUTIVE SUMMARY:");
    lines.push(`  "${data.summaryRoast}"`);
    lines.push("");
    
    // Detailed Roasts Section
    lines.push("📝 DETAILED ROASTS:");
    data.roasts.forEach(roast => {
      lines.push(`  ▸ ${roast}`);
    });
    lines.push("");
    
    // Issues Section
    lines.push("⚠️ ISSUES DETECTED:");
    data.issues.forEach(issue => {
      lines.push(`  • ${issue}`);
    });
    lines.push("");
    
    // Suggestions Section
    lines.push("✨ SUGGESTED IMPROVEMENTS:");
    data.suggestions.forEach(suggestion => {
      lines.push(`  → ${suggestion}`);
    });
    lines.push("");
    
    // Improved Summary Section
    lines.push("📄 IMPROVED SUMMARY:");
    lines.push(`  ${data.improvedSummary}`);
    lines.push("");
    lines.push("────────────────────────────────");
    lines.push("$ _");
    
    return lines;
  };

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
      setDisplayedLines([]);
      setCurrentSection(0);
      setCurrentLineIndex(0);
      return;
    }

    if (loading) {
      if (currentSection < loadingLines.length) {
        const timer = setTimeout(() => {
          setDisplayedLines(prev => [...prev, loadingLines[currentSection]]);
          setCurrentSection(prev => prev + 1);
          
          // Auto-scroll to bottom
          if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
          }
        }, 400);

        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, loading, currentSection, loadingLines]);

  // Typing animation for results with section pauses
  useEffect(() => {
    if (!isOpen || loading || !roastData) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      return;
    }

    const formattedLines = getFormattedLines(roastData);
    
    if (isTypingPaused) return;

    if (currentLineIndex < formattedLines.length) {
      const currentLine = formattedLines[currentLineIndex];
      
      // Check if this is a pause line
      if (currentLine.includes("(Press any key to continue...)")) {
        setIsTypingPaused(true);
        
        // Auto-scroll to show the pause message
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
        return;
      }

      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentLine]);
        setCurrentLineIndex(prev => prev + 1);
        
        // Auto-scroll to bottom
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      }, 50); // Fast typing speed

      return () => clearTimeout(timer);
    }
  }, [isOpen, loading, roastData, currentLineIndex, isTypingPaused]);

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
      setDisplayedLines([]);
      setCurrentSection(0);
      setCurrentLineIndex(0);
      setIsTypingPaused(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (onDownload) onDownload();
  };

  const handleRoastAnother = () => {
    setDisplayedLines([]);
    setCurrentSection(0);
    setCurrentLineIndex(0);
    setIsTypingPaused(false);
    if (onRoastAnother) onRoastAnother();
  };

  const handleContinue = () => {
    if (isTypingPaused) {
      setIsTypingPaused(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300">
      {/* Modal Container - Terminal style with reduced height */}
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

        {/* Terminal Content - Scrollable */}
        <div
          ref={contentRef}
          className="p-4 overflow-y-auto max-h-[calc(80vh-100px)] font-mono text-[12px] leading-relaxed scrollbar-thin scrollbar-thumb-[#00FF41]/30 scrollbar-track-transparent"
          style={{ backgroundColor: '#050f05' }}
          onClick={handleContinue}
        >
          {loading ? (
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
          ) : roastData && (
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
                if (line.includes("(Press any key to continue...)")) {
                  color = "#666";
                }
                
                // Add indentation for bullet points
                const isBullet = line.startsWith("  ▸") || line.startsWith("  •") || line.startsWith("  →");
                const isPauseLine = line.includes("(Press any key to continue...)");
                
                return (
                  <div
                    key={index}
                    style={{ color }}
                    className={`${isBullet ? 'ml-4' : ''} ${isPauseLine ? 'mt-3 mb-2 text-center' : ''} animate-fadeIn whitespace-pre-wrap`}
                  >
                    {line}
                  </div>
                );
              })}
              
              {/* Pause indicator with blinking cursor */}
              {isTypingPaused && (
                <div className="mt-2 text-[#666] text-center animate-pulse">
                  ⏎ Press any key or click to continue... {showCursor && '█'}
                </div>
              )}
              
              {/* Blinking cursor at the end when typing is complete */}
              {!isTypingPaused && currentLineIndex >= getFormattedLines(roastData).length && (
                <span className="text-[#00FF41] inline-block mt-1" style={{ opacity: showCursor ? 1 : 0 }}>█</span>
              )}
            </div>
          )}
        </div>

        {/* Terminal Footer with Buttons - Only show when not loading and typing complete */}
        {!loading && roastData && currentLineIndex >= getFormattedLines(roastData).length && (
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