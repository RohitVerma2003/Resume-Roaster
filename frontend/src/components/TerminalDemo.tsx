import { useEffect, useState } from "react";

interface Line {
  text: string;
  delay: number;
  color: string;
  prefix?: boolean;
}

const TerminalDemo: React.FC = () => {
  const lines: Line[] = [
    { text: "$ analyze resume.pdf", delay: 0, color: "#00FF9C", prefix: true },
    { text: "Scanning document structure...", delay: 800, color: "#666" },
    { text: "Running ATS compatibility checks...", delay: 1600, color: "#666" },
    { text: "ATS Score: 54/100 ⚠️", delay: 2400, color: "#FFB800" },
    { text: "───────────────────────", delay: 3000, color: "#1a3a1a" },
    { text: "🔥 RESUME ROAST INITIATED", delay: 3400, color: "#FF4444" },
    { text: "───────────────────────", delay: 3800, color: "#1a3a1a" },
    { text: '▸ "Passionate developer" detected.', delay: 4200, color: "#00FF9C" },
    { text: "  Every fresher says this. Try harder.", delay: 4200, color: "#888" },
    { text: '▸ Weather App project found.', delay: 5000, color: "#00FF9C" },
    { text: "  Did you follow a YouTube tutorial?", delay: 5000, color: "#888" },
    { text: '▸ No measurable achievements found.', delay: 5800, color: "#00FF9C" },
    { text: "  Recruiters love numbers. Give them.", delay: 5800, color: "#888" },
    { text: '▸ 3-page resume detected. Cut to 1.', delay: 6600, color: "#FF4444" },
    { text: "────────────────────────", delay: 7200, color: "#1a3a1a" },
    { text: "✓ Generating improvements...", delay: 7600, color: "#00FF9C" },
  ];
  
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  
  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(prev => [...prev, i]), line.delay + 500);
    });
    
    const blink = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(blink);
  }, []);
  
  return (
    <div className="bg-[#050f05] border border-[#00FF4120] rounded-lg p-6 font-mono text-[13px] leading-relaxed shadow-[0_0_40px_#00FF4115,inset_0_0_60px_#00080060]">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        <span className="text-[#333] ml-2 text-[11px]">resume_roaster — bash</span>
      </div>
      {lines.map((line, i) => (
        visibleLines.includes(i) && (
          <div key={i} style={{ color: line.color }} className="mb-0.5 animate-fadeIn">
            {line.text}
          </div>
        )
      ))}
      {visibleLines.length > 0 && (
        <span className="text-[#00FF9C]" style={{ opacity: showCursor ? 1 : 0 }}>█</span>
      )}
    </div>
  );
};

export default TerminalDemo