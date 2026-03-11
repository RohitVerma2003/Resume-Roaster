import React, { useState, useEffect, useRef } from "react";

// Types
interface Line {
  text: string;
  delay: number;
  color: string;
  prefix?: boolean;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

interface StepProps {
  num: string;
  icon: string;
  title: string;
  desc: string;
}

interface Testimonial {
  quote: string;
  author: string;
}

// Matrix Rain Component
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01010110ABCDEF<>{}[]";
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px monospace`;
      
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = i % 3 === 0 ? "#00FF9C" : "#003B00";
        ctx.fillText(char, i * fontSize, y * fontSize);
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    
    const interval = setInterval(draw, 50);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed top-0 left-0 opacity-15 z-0 pointer-events-none" />;
};

// Typing Terminal
const TerminalDemo: React.FC = () => {
  const lines: Line[] = [
    { text: "$ analyze resume.pdf", delay: 0, color: "#00FF9C", prefix: true },
    { text: "Scanning document structure...", delay: 800, color: "#666" },
    { text: "Running ATS compatibility checks...", delay: 1600, color: "#666" },
    { text: "ATS Score: 54/100 ⚠️", delay: 2400, color: "#FFB800" },
    { text: "─────────────────────────────", delay: 3000, color: "#1a3a1a" },
    { text: "🔥 RESUME ROAST INITIATED", delay: 3400, color: "#FF4444" },
    { text: "─────────────────────────────", delay: 3800, color: "#1a3a1a" },
    { text: '▸ "Passionate developer" detected.', delay: 4200, color: "#00FF9C" },
    { text: "  Every fresher says this. Try harder.", delay: 4200, color: "#888" },
    { text: '▸ Weather App project found.', delay: 5000, color: "#00FF9C" },
    { text: "  Did you follow a YouTube tutorial?", delay: 5000, color: "#888" },
    { text: '▸ No measurable achievements found.', delay: 5800, color: "#00FF9C" },
    { text: "  Recruiters love numbers. Give them.", delay: 5800, color: "#888" },
    { text: '▸ 3-page resume detected. Cut to 1.', delay: 6600, color: "#FF4444" },
    { text: "─────────────────────────────", delay: 7200, color: "#1a3a1a" },
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

// Feature Card
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  
  return (
    <div 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      className={`border rounded-xl p-7 bg-[#050a05] transition-all duration-300 cursor-default ${
        hovered ? 'border-[#00FF9C] shadow-[0_0_30px_#00FF9C20,inset_0_0_30px_#00FF9C05]' : 'border-[#00FF9C25]'
      }`}
    >
      <div className="text-3xl mb-3.5">{icon}</div>
      <div className="text-[#00FF9C] font-mono font-bold text-[15px] mb-2 tracking-wider">{title}</div>
      <div className="text-[#667] text-[13.5px] leading-relaxed">{desc}</div>
    </div>
  );
};

// Step
const Step: React.FC<StepProps> = ({ num, icon, title, desc }) => (
  <div className="flex flex-col items-center text-center flex-1">
    <div className="w-14 h-14 rounded-full border-2 border-[#00FF9C] flex items-center justify-center text-2xl mb-4 shadow-[0_0_20px_#00FF9C30] bg-[#050f05]">
      {icon}
    </div>
    <div className="text-[#00FF9C40] font-mono text-[11px] mb-1">STEP {num}</div>
    <div className="text-[#00FF9C] font-mono font-bold text-sm mb-2">{title}</div>
    <div className="text-[#556] text-[13px] leading-relaxed max-w-[180px]">{desc}</div>
  </div>
);

// Navbar Component with Hamburger Menu
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = ["Features", "How It Works", "Pricing"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-10 py-4 flex justify-between items-center border-b border-[#00FF9C15] backdrop-blur-xl bg-black/80">
      <div className="font-['JetBrains_Mono'] font-extrabold text-lg text-[#00FF9C] tracking-wider animate-glow">
        &gt; RESUME_ROASTER
      </div>
      
      {/* Desktop Menu */}
      <div className="flex gap-8 items-center">
        <div className="flex gap-8 items-center">
          {navItems.map(item => (
            <span 
              key={item} 
              className="text-[#445] text-[13px] cursor-pointer transition-colors duration-200 tracking-wider hover:text-[#00FF9C]"
            >
              {item}
            </span>
          ))}
        </div>
        <button className="btn-primary px-5 py-2.5 text-xs">$ Login</button>
      </div>

      {/* Hamburger Icon - Mobile */}
      <button 
        className="hidden flex-col gap-1.5 cursor-pointer md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`w-6 h-0.5 bg-[#00FF9C] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <div className={`w-6 h-0.5 bg-[#00FF9C] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
        <div className={`w-6 h-0.5 bg-[#00FF9C] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-[#00FF9C20] p-5 flex flex-col gap-4 animate-slideDown md:hidden"
        >
          {navItems.map(item => (
            <span 
              key={item} 
              className="text-[#445] text-sm cursor-pointer transition-colors duration-200 tracking-wider py-2 hover:text-[#00FF9C]"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </span>
          ))}
          <button className="btn-primary py-3 text-xs mt-2">$ Login</button>
        </div>
      )}
    </nav>
  );
};

// Main App Component
const App: React.FC = () => {
  const [glitch, setGlitch] = useState<boolean>(false);
  
  useEffect(() => {
    const g = setInterval(() => { 
      setGlitch(true); 
      setTimeout(() => setGlitch(false), 150); 
    }, 4000);
    return () => clearInterval(g);
  }, []);

  const stats: Array<[string, string]> = [
    ["10K+", "Resumes Roasted"],
    ["94%", "Accuracy Rate"],
    ["2.3s", "Avg. Analysis"]
  ];

  const testimonials: Testimonial[] = [
    { quote: "My resume had 'hardworking' in it. The AI said 'so does everyone's LinkedIn'. Fair point.", author: "@csstanley_dev" },
    { quote: "Got rejected 50 times. Used this tool. Rewrote resume. Got 3 offers in two weeks. No cap.", author: "@frontend.fatima" },
  ];

  return (
    <div className="bg-black min-h-screen text-white font-mono overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=JetBrains+Mono:wght@400;700;800&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: none; }
        }
        
        @keyframes glow {
          0%,100% { text-shadow: 0 0 10px #00FF9C, 0 0 30px #00FF9C50; }
          50% { text-shadow: 0 0 20px #00FF9C, 0 0 60px #00FF9C, 0 0 80px #00FF9C40; }
        }
        
        @keyframes glitch {
          0%,100% { clip-path: none; transform: none; }
          25% { clip-path: rect(20px,900px,30px,0); transform: translateX(-4px); }
          50% { clip-path: rect(60px,900px,70px,0); transform: translateX(4px); }
          75% { clip-path: rect(10px,900px,20px,0); transform: translateX(-2px); }
        }
        
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 20px #00FF9C50; }
          50% { box-shadow: 0 0 40px #00FF9C, 0 0 60px #00FF9C50; }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-glitch {
          animation: glitch 0.3s ease;
        }
        
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        
        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease;
        }
        
        .btn-primary {
          background: #00FF9C;
          color: black;
          border: none;
          padding: 14px 32px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 1px;
        }
        
        .btn-primary:hover {
          background: #00FFB8;
          box-shadow: 0 0 30px #00FF9C70;
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          background: transparent;
          color: #00FF9C;
          border: 1px solid #00FF9C50;
          padding: 14px 32px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 1px;
        }
        
        .btn-secondary:hover {
          border-color: #00FF9C;
          background: #00FF9C10;
          transform: translateY(-2px);
        }
        
        .scanline {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(transparent, #00FF9C20, transparent);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <MatrixRain />
      <div className="scanline animate-scanline" />

      <Navbar />

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-10 pt-[120px] pb-20">
        <div className="font-mono text-xs text-[#00FF9C60] tracking-[4px] mb-6 uppercase">
          [ AI-Powered Resume Analysis ]
        </div>
        <h1 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(36px,6vw,72px)] leading-tight mb-2 max-w-[800px]">
          <span className="text-white block relative">
            <span style={{ color: glitch ? "#FF0040" : "#fff" }} className="transition-colors duration-100">Your Resume</span>
            <span className="text-[#00FF9C]"> Might Be</span>
          </span>
          <span className="text-[#00FF9C] animate-glow block">
            Good.
          </span>
          <span className="text-[#445] text-[clamp(18px,3vw,36px)] font-normal block mt-4">
            But Let's See What a Tired
          </span>
          <span className="text-[#667] text-[clamp(18px,3vw,36px)] font-normal">
            Recruiter Thinks.
          </span>
        </h1>
        <p className="text-[#445] text-[15px] leading-relaxed max-w-[520px] mx-8 my-8 font-mono">
          Upload your resume and get <span className="text-[#00FF9C]">brutally honest AI feedback</span>, ATS score analysis, and actionable improvements. No sugarcoating.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="btn-primary">📁 Upload Resume</button>
          <button className="btn-secondary">▶ Try Demo Roast</button>
        </div>
        <div className="flex gap-10 mt-14 flex-wrap justify-center">
          {stats.map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="font-['JetBrains_Mono'] font-extrabold text-3xl text-[#00FF9C] animate-glow">{val}</div>
              <div className="text-[#334] text-[11px] tracking-wider mt-1">{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TERMINAL DEMO */}
      <section className="relative z-10 py-20 px-10 max-w-[860px] mx-auto">
        <div className="text-center mb-12">
          <div className="text-[#00FF9C] font-mono text-[11px] tracking-[4px] mb-3">// LIVE DEMO</div>
          <h2 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(24px,4vw,42px)] text-white">
            Watch It <span className="text-[#00FF9C]">Roast</span> In Real-Time
          </h2>
        </div>
        <TerminalDemo />
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-20 px-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[#00FF9C] font-mono text-[11px] tracking-[4px] mb-3">// FEATURES</div>
          <h2 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(24px,4vw,42px)] text-white">
            What You <span className="text-[#00FF9C]">Get</span>
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          <FeatureCard icon="🔥" title="BRUTAL AI FEEDBACK" desc="AI reviews your resume like a tired recruiter on their 200th application of the day. Zero mercy." />
          <FeatureCard icon="📊" title="ATS SCORE" desc="See exactly how your resume performs in Applicant Tracking Systems before a human ever reads it." />
          <FeatureCard icon="✨" title="SMART SUGGESTIONS" desc="Not just criticism — clear, actionable advice ranked by impact so you know what to fix first." />
          <FeatureCard icon="📄" title="RESUME REWRITE" desc="Generate a stronger version of weak sections. Same experience, better positioning." />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 py-20 px-10 bg-[#020802] border-y border-[#00FF9C10]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#00FF9C] font-mono text-[11px] tracking-[4px] mb-3">// HOW IT WORKS</div>
            <h2 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(24px,4vw,42px)] text-white">
              Three Steps to <span className="text-[#00FF9C]">Enlightenment</span>
            </h2>
          </div>
          <div className="flex gap-6 items-start flex-wrap justify-center">
            <Step num="01" icon="📁" title="UPLOAD PDF" desc="Drop your resume PDF. We accept all formats and layouts." />
            <div className="text-[#00FF9C20] text-3xl pt-2.5 self-start mt-2">──&gt;</div>
            <Step num="02" icon="🤖" title="AI ANALYZES" desc="Our model tears through your resume like a recruiter with trust issues." />
            <div className="text-[#00FF9C20] text-3xl pt-2.5 self-start mt-2">──&gt;</div>
            <Step num="03" icon="🔥" title="GET ROASTED" desc="Receive brutal feedback, ATS score, and a roadmap to actually get hired." />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative z-10 py-[100px] px-10 text-center">
        <div className="max-w-[700px] mx-auto">
          <div className="text-[#00FF9C30] font-mono text-[60px] leading-none -mb-5">"</div>
          <blockquote className="font-['Caveat'] text-[clamp(26px,4vw,42px)] text-[#ccc] leading-relaxed mx-0 mb-6">
            This AI roasted my resume harder than my tech interview. And somehow I still got the job.
          </blockquote>
          <div className="text-[#00FF9C] font-mono text-xs tracking-wider">— @devloper_irl · Senior SWE @ Stripe</div>
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(5)].map((_, i) => <span key={i} className="text-[#00FF9C] text-lg">★</span>)}
          </div>
        </div>

        {/* Second quote row */}
        <div className="flex gap-6 max-w-[1000px] mx-auto mt-16 flex-wrap justify-center">
          {testimonials.map(({ quote, author }) => (
            <div key={author} className="flex-1 min-w-[280px] bg-[#050a05] border border-[#00FF9C15] rounded-lg p-6 text-left">
              <div className="font-['Caveat'] text-xl text-[#aaa] leading-relaxed mb-4">"{quote}"</div>
              <div className="text-[#00FF9C60] font-mono text-[11px]">{author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-[100px] px-10 text-center bg-[radial-gradient(ellipse_at_center,_#001a00_0%,_#000_70%)]">
        <div className="font-mono text-[11px] text-[#00FF9C40] tracking-[4px] mb-5">[ FINAL BOSS ]</div>
        <h2 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(28px,5vw,60px)] text-white mb-4 leading-tight">
          Ready to Roast<br /><span className="text-[#00FF9C] animate-glow">Your Resume?</span>
        </h2>
        <p className="text-[#445] font-mono text-sm mb-10">
          Join 10,000+ developers who stopped wondering why they get ghosted.
        </p>
        <button className="btn-primary text-base px-12 py-[18px] animate-pulse-custom">
          🔥 Roast My Resume
        </button>
        <div className="text-[#223] font-mono text-[11px] mt-5 tracking-wider">
          Free · No signup required · Results in &lt;3 seconds
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 px-10 border-t border-[#00FF9C10] flex justify-between items-center flex-wrap gap-4">
        <div className="font-['JetBrains_Mono'] font-bold text-[#00FF9C50] text-sm tracking-wider">
          &gt; RESUME_ROASTER © 2026
        </div>
        <div className="flex gap-6 flex-wrap">
          {["Privacy", "Terms", "GitHub", "Twitter"].map(item => (
            <span 
              key={item} 
              className="text-[#334] text-xs cursor-pointer font-mono tracking-wider transition-colors duration-200 hover:text-[#00FF9C]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="text-[#223] font-mono text-[11px]">
          Built with 🔥 and zero mercy
        </div>
      </footer>
    </div>
  );
};

export default App;