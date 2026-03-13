import React, { useState, useEffect, useRef } from "react";
import TerminalRoastModal from "../components/TerminalRoastModal";
import { useResumeRoast } from "../hooks/useResumeRoast";
import MatrixRain from "../components/MatrixRain";
import FeatureCard from "../components/FeatureCard";
import Step from "../components/Step";
import Navbar from "../components/Navbar";
import TerminalDemo from "../components/TerminalDemo";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [glitch, setGlitch] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const {
    uploadResume,
    loading: uploadLoading,
    roastData: uploadRoastData,
    uploadProgress,
    reset: resetUpload,
  } = useResumeRoast();

  useEffect(() => {
    const g = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(g);
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB");
      return;
    }

    setIsUploadModalOpen(true);
    await uploadResume(file);
  };

  const handleUploadClick = () => {
    resetUpload();
    fileInputRef.current?.click();
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    resetUpload();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRoastAnother = () => {
    resetUpload();
    handleUploadClick();
  };

  const handleDownloadImproved = () => {
    const data = uploadRoastData;
    if (data) {
      const content = `Improved Resume Summary\n\n${data.improvedSummary}\n\nSuggestions:\n${data.suggestions.join("\n")}`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "improved-resume-summary.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // const stats: Array<[string, string]> = [
  //   ["10K+", "Resumes Roasted"],
  //   ["94%", "Accuracy Rate"],
  //   ["2.3s", "Avg. Analysis"],
  // ];

  return (
    <div className="bg-black min-h-screen text-white font-mono overflow-x-hidden">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      <MatrixRain />
      <div className="scanline animate-scanline" />

      <Navbar />

      {/* Upload Modal */}
      <TerminalRoastModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        loading={uploadLoading}
        roastData={uploadRoastData}
        onDownload={handleDownloadImproved}
        onRoastAnother={handleRoastAnother}
      />

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-10 pt-[120px] pb-20">
        <div className="font-mono text-xs text-[#00FF9C60] tracking-[4px] mb-6 uppercase">
          [ AI-Powered Resume Analysis ]
        </div>
        <h1 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(36px,6vw,72px)] leading-tight mb-2 max-w-[800px]">
          <span className="text-white block relative">
            <span
              style={{ color: glitch ? "#FF0040" : "#fff" }}
              className="transition-colors duration-100"
            >
              Your Resume
            </span>
            <span className="text-[#00FF9C]"> Might Be</span>
            <span className="text-[#00FF9C] animate-glow"> Good.</span>
          </span>
          <span className="text-[#445] text-[clamp(18px,3vw,36px)] font-normal block mt-4">
            But Let's See What a Tired
          </span>
          <span className="text-[#667] text-[clamp(18px,3vw,36px)] font-normal">
            Recruiter Thinks.
          </span>
        </h1>
        <p className="text-[#445] text-[15px] leading-relaxed max-w-[520px] mx-8 my-8 font-mono">
          Upload your resume and get{" "}
          <span className="text-[#00FF9C]">brutally honest AI feedback</span>,
          ATS score analysis, and actionable improvements. No sugarcoating.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={handleUploadClick} className="btn-primary">
            📁 Upload Resume
          </button>
          <button className="btn-secondary" onClick={()=> navigate("/demo")}>▶ Demo Roast</button>
        </div>

        {/* Upload Progress Indicator */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-6 w-64">
            <div className="flex justify-between text-[#00FF9C] text-xs mb-1">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-1 bg-[#00FF9C20] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00FF9C] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* <div className="flex gap-10 mt-14 flex-wrap justify-center">
          {stats.map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="font-['JetBrains_Mono'] font-extrabold text-3xl text-[#00FF9C] animate-glow">
                {val}
              </div>
              <div className="text-[#334] text-[11px] tracking-wider mt-1">
                {label.toUpperCase()}
              </div>
            </div>
          ))}
        </div> */}
      </section>

      {/* TERMINAL DEMO */}
      <section className="relative z-10 py-20 px-10 max-w-[860px] mx-auto">
        <div className="text-center mb-12">
          <div className="text-[#00FF9C] font-mono text-[11px] tracking-[4px] mb-3">
            // LIVE DEMO
          </div>
          <h2 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(24px,4vw,42px)] text-white">
            Watch It <span className="text-[#00FF9C]">Roast</span> In Real-Time
          </h2>
        </div>
        <TerminalDemo />
      </section>

      {/* FEATURES */}
      <section
        className="relative z-10 py-20 px-10 max-w-[1100px] mx-auto"
        id="features"
      >
        <div className="text-center mb-14">
          <div className="text-[#00FF9C] font-mono text-[11px] tracking-[4px] mb-3">
            // FEATURES
          </div>
          <h2 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(24px,4vw,42px)] text-white">
            What You <span className="text-[#00FF9C]">Get</span>
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          <FeatureCard
            icon="🔥"
            title="BRUTAL AI FEEDBACK"
            desc="AI reviews your resume like a tired recruiter on their 200th application of the day. Zero mercy."
          />
          <FeatureCard
            icon="📊"
            title="ATS SCORE"
            desc="See exactly how your resume performs in Applicant Tracking Systems before a human ever reads it."
          />
          <FeatureCard
            icon="✨"
            title="SMART SUGGESTIONS"
            desc="Not just criticism — clear, actionable advice ranked by impact so you know what to fix first."
          />
          <FeatureCard
            icon="📄"
            title="RESUME REWRITE"
            desc="Generate a stronger version of weak sections. Same experience, better positioning."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="relative z-10 py-20 px-10 bg-[#020802] border-y border-[#00FF9C10]"
        id="how-it-works"
      >
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#00FF9C] font-mono text-[11px] tracking-[4px] mb-3">
              // HOW IT WORKS
            </div>
            <h2 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(24px,4vw,42px)] text-white">
              Three Steps to{" "}
              <span className="text-[#00FF9C]">Enlightenment</span>
            </h2>
          </div>
          <div className="flex gap-6 items-start flex-wrap justify-center">
            <Step
              num="01"
              icon="📁"
              title="UPLOAD PDF"
              desc="Drop your resume PDF. We accept all formats and layouts."
            />
            <div className="text-[#00FF9C20] text-3xl pt-2.5 self-start mt-2 hidden md:block">
              ──&gt;
            </div>
            <Step
              num="02"
              icon="🤖"
              title="AI ANALYZES"
              desc="Our model tears through your resume like a recruiter with trust issues."
            />
            <div className="text-[#00FF9C20] text-3xl pt-2.5 self-start mt-2 hidden md:block">
              ──&gt;
            </div>
            <Step
              num="03"
              icon="🔥"
              title="GET ROASTED"
              desc="Receive brutal feedback, ATS score, and a roadmap to actually get hired."
            />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative z-10 py-[100px] px-10 text-center">
        <div className="max-w-[700px] mx-auto">
          <div className="text-[#00FF9C30] font-mono text-[60px] leading-none -mb-5">
            "
          </div>
          <blockquote className="font-['Caveat'] text-[clamp(26px,4vw,42px)] text-[#ccc] leading-relaxed mx-0 mb-6">
            This AI roasted my resume harder than my tech interview. And somehow
            I still got the job.
          </blockquote>
          <div className="text-[#00FF9C] font-mono text-xs tracking-wider">
            — @devloper_irl
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#00FF9C] text-lg">
                ★
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-[100px] px-10 text-center bg-[radial-gradient(ellipse_at_center,_#001a00_0%,_#000_70%)]">
        <div className="font-mono text-[11px] text-[#00FF9C40] tracking-[4px] mb-5">
          [ FINAL BOSS ]
        </div>
        <h2 className="font-['JetBrains_Mono'] font-extrabold text-[clamp(28px,5vw,60px)] text-white mb-4 leading-tight">
          Ready to Roast
          <br />
          <span className="text-[#00FF9C] animate-glow">Your Resume?</span>
        </h2>
        <p className="text-[#445] font-mono text-sm mb-10">
          Join developers who stopped wondering why they get ghosted.
        </p>
        <button
          onClick={handleUploadClick}
          className="btn-primary text-base px-12 py-[18px] animate-pulse-custom"
        >
          🔥 Roast My Resume
        </button>
        <div className="text-[#223] font-mono text-[11px] mt-5 tracking-wider">
          Free · No signup required · Results in seconds
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 px-10 border-t border-[#00FF9C10] flex justify-between items-center flex-wrap gap-4">
        <div className="font-['JetBrains_Mono'] font-bold text-[#00FF9C50] text-sm tracking-wider">
          &gt; RESUME_ROASTER © 2026
        </div>
        <div className="flex gap-6 flex-wrap">
          {[
            {
              name: "GitHub",
              link: "https://github.com/RohitVerma2003",
            },
            {
              name: "LinkedIn",
              link: "https://www.linkedin.com/in/rohitdverma",
            },
            {
              name: "Open Source",
              link: "https://github.com/RohitVerma2003/Resume-Roaster",
            },
          ].map((item) => (
            <a
              key={item.name}
              className="text-[#334] text-xs cursor-pointer font-mono tracking-wider transition-colors duration-200 hover:text-[#00FF9C]"
              target="_blank"
              href={item.link}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="text-[#223] font-mono text-[11px]">
          Built with 🔥 and zero mercy
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
