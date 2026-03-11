import React from 'react';

interface StepProps {
  num: string;
  icon: string;
  title: string;
  desc: string;
}

const Step: React.FC<StepProps> = ({ num, icon, title, desc }) => {
  return (
    <div className="relative flex flex-col items-center text-center flex-1 min-w-[200px] group">
      {/* Step Number Background */}
      <div className="absolute -top-2 -right-2 text-[80px] font-mono font-bold text-[#00FF9C05] select-none pointer-events-none">
        {num}
      </div>
      
      {/* Icon Container with Glow */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#00FF9C] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
        <div className="relative w-16 h-16 rounded-full border-2 border-[#00FF9C] flex items-center justify-center text-3xl mb-5 shadow-[0_0_20px_#00FF9C30] bg-[#050f05] group-hover:shadow-[0_0_30px_#00FF9C] transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
      
      {/* Step Number Text */}
      <div className="text-[#00FF9C40] font-mono text-xs mb-2 tracking-[2px]">
        STEP {num}
      </div>
      
      {/* Title with Hover Effect */}
      <div className="text-[#00FF9C] font-mono font-bold text-sm mb-3 relative">
        <span className="relative z-10">{title}</span>
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-12 h-0.5 bg-[#00FF9C] transition-all duration-300" />
      </div>
      
      {/* Description */}
      <div className="text-[#556] text-[13px] leading-relaxed max-w-[200px] font-mono">
        {desc}
      </div>
      
      {/* Terminal-style brackets on hover */}
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-[#00FF9C20] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        [
      </div>
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-[#00FF9C20] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        ]
      </div>
    </div>
  );
};

export default Step;