import React, { useState } from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  
  return (
    <div 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      className={`relative group cursor-default overflow-hidden rounded-xl p-7 bg-[#050a05] transition-all duration-300 ${
        hovered 
          ? 'border-[#00FF9C] shadow-[0_0_30px_#00FF9C20,inset_0_0_30px_#00FF9C05]' 
          : 'border-[#00FF9C25]'
      } border`}
    >
      {/* Matrix rain effect overlay on hover */}
      <div className={`absolute inset-0 pointer-events-none opacity-0 ${hovered ? 'opacity-10' : ''} transition-opacity duration-500`}>
        <div className="matrix-rain-snippet"></div>
      </div>
      
      {/* Icon with glow effect */}
      <div className={`relative z-10 text-4xl mb-4 transition-all duration-300 ${hovered ? 'scale-110 text-[#00FF9C]' : 'text-[#00FF9C80]'}`}>
        {icon}
      </div>
      
      {/* Title */}
      <div className="relative z-10 text-[#00FF9C] font-mono font-bold text-[15px] mb-2 tracking-wider flex items-center gap-2">
        <span className="text-[#00FF9C40]">{'>'}</span>
        {title}
      </div>
      
      {/* Description */}
      <div className="relative z-10 text-[#667] text-[13.5px] leading-relaxed font-mono">
        {desc}
      </div>
      
      {/* Bottom border glow on hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00FF9C] to-transparent transform scale-x-0 ${hovered ? 'scale-x-100' : ''} transition-transform duration-500`} />
    </div>
  );
};

export default FeatureCard;