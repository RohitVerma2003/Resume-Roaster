import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../components/MatrixRain';
import Navbar from '../components/Navbar';
import TerminalRoastModal from '../components/TerminalRoastModal';

// Import your resume image
import yourResumeImage from '../assets/your-resume.jpg'; // Update this path

const DemoPage: React.FC = () => {
  const navigate = useNavigate();
  const [showRoastModal, setShowRoastModal] = useState(false);

  // Demo data matching your API response
  const demoRoastData = {
    atsScore: 65,
    summaryRoast: "Rohit Verma's resume is like a Bollywood movie—lots of action, but some scenes are just filler. Let's cut to the chase.",
    roasts: [
      "Education section is as exciting as a PowerPoint presentation on 'The History of Paperclips.' GPA? Meh. Where's the spice?",
      "Experience section: 'Developed and scaled a full-stack HealthTech platform'—cool, but did it cure cancer? Give us metrics or GTFO.",
      "Projects: 'PrepPilot 2' sounds like a rejected startup name from Shark Tank. Also, 'cheat-proof backend-only state'—bold claim. Prove it.",
      "Skills: 'C, C++, JavaScript, TypeScript'—so, you're basically a walking programming language dictionary. But can you actually build something useful?",
      "Achievements: 'Top 22% problem solver on LeetCode'—so, 78% are better? Ouch."
    ],
    issues: [
      "No quantifiable impact in experience section (e.g., 'reduced manual ops by 40%' is vague—40% of what?).",
      "Projects lack real-world deployment links or user metrics (e.g., '100+ daily active users'—where's the proof?).",
      "Skills section is a laundry list. Prioritize what's relevant to the job you're applying for.",
      "Formatting is inconsistent (e.g., 'Databases:MongoDB'—missing space, seriously?).",
      "No GitHub/Live links for projects. Are they real or just figments of your imagination?"
    ],
    suggestions: [
      "Add metrics everywhere. Did your HealthTech platform save lives or just lines of code?",
      "Trim the skills list. Nobody cares if you know HTML5 unless you're applying to a 2005 web dev job.",
      "Include GitHub/Live project links. Show, don't tell.",
      "Fix formatting. A missing space is the difference between 'Databases:MongoDB' and 'Databases: MongoDB' (and sanity).",
      "Rewrite the summary to highlight unique value. 'Full-stack dev who actually ships products' > 'I know C++.'"
    ],
    improvedSummary: "Full-stack developer with a knack for building (and scaling) real-world applications. Proven track record of reducing operational overhead by 40% and creating tools used by 100+ daily active users. LeetCode warrior (top 22%), but prefers shipping code over solving hypothetical problems. Let's build something that doesn't suck."
  };

  const handleTryNow = () => {
    navigate('/');
  };

  const handleViewRoast = () => {
    setShowRoastModal(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden">
      <MatrixRain />
      <Navbar />

      {/* Demo Modal */}
      <TerminalRoastModal
        isOpen={showRoastModal}
        onClose={() => setShowRoastModal(false)}
        loading={false}
        roastData={demoRoastData}
        onDownload={() => {
          const content = `Improved Resume Summary\n\n${demoRoastData.improvedSummary}`;
          const blob = new Blob([content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'improved-resume-summary.txt';
          a.click();
          URL.revokeObjectURL(url);
        }}
        onRoastAnother={() => setShowRoastModal(false)}
      />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 border border-[#00FF9C] rounded-full mb-6">
            <span className="text-[#00FF9C] text-xs tracking-wider">🚀 LIVE DEMO</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            See How It{' '}
            <span className="text-[#00FF9C] animate-glow">Works</span>
          </h1>
          <p className="text-[#667] text-lg max-w-2xl mx-auto mb-8">
            Click the button below to see a live demo with real roast data
          </p>
        </div>
      </section>

      {/* Demo Content */}
      <section className="relative z-10 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Resume Image Card */}
          <div className="bg-[#0a0a0a] border-2 border-[#00FF9C30] rounded-xl p-6 mb-8 hover:border-[#00FF9C] transition-all duration-300 hover:shadow-[0_0_30px_#00FF9C20]">
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#00FF9C20]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
              </div>
              <span className="text-[#666] text-sm ml-2">~/resume-preview.pdf</span>
            </div>

            {/* Resume Image */}
            <div className="relative aspect-[1/1.4] bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] rounded-lg overflow-hidden mb-4">
              <img 
                src={yourResumeImage} 
                alt="Resume Preview" 
                className="w-full h-full object-contain"
              />
              
              {/* Terminal overlay effect */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF9C] to-transparent animate-scan" />
              </div>
            </div>

            {/* File Info */}
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#00FF9C]">
                <span className="text-[#666] mr-2">$</span>
                Rohit_Verma_Resume.pdf
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={handleViewRoast}
              className="group relative px-8 py-4 bg-[#00FF9C] text-black rounded-lg font-mono font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_#00FF9C] hover:scale-105"
            >
              <span className="relative z-10">🔥 View Demo Roast</span>
              <div className="absolute inset-0 bg-[#00FF9C] rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </button>
            
            <p className="text-[#445] text-sm mt-4 font-mono">
              Click to see the terminal roast in action
            </p>
          </div>

          {/* Try Now Link */}
          <div className="text-center mt-8">
            <button
              onClick={handleTryNow}
              className="text-[#00FF9C] hover:underline text-sm"
            >
              Want to roast your own resume? → Try Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;