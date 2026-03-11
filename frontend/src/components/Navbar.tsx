import React, { useState, useEffect, useRef } from 'react';

interface NavItem {
  id: string;
  name: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { id: 'features', name: 'Features' },
    { id: 'how-it-works', name: 'How It Works' }
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Height of your navbar in pixels
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu after clicking
      setIsMenuOpen(false);
      
      // Update active section
      setActiveSection(sectionId);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(item.id);
            break;
          }else{
            setActiveSection("");
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-10 py-4 flex justify-between items-center border-b border-[#00FF9C15] backdrop-blur-xl bg-black/80">
      <div 
        className="font-['JetBrains_Mono'] font-extrabold text-lg text-[#00FF9C] tracking-wider animate-glow cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        &gt; RESUME_ROASTER
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        <div className="flex gap-8 items-center">
          {navItems.map(item => (
            <span 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className={`text-[13px] cursor-pointer transition-all duration-200 tracking-wider relative group ${
                activeSection === item.id ? 'text-[#00FF9C]' : 'text-[#445] hover:text-[#00FF9C]'
              }`}
            >
              {item.name}
              {/* Active indicator */}
              <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00FF9C] transform origin-left transition-transform duration-300 ${
                activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </span>
          ))}
        </div>
      </div>

      {/* Hamburger Icon - Mobile */}
      <button 
        className="flex md:hidden flex-col gap-1.5 cursor-pointer"
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
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className={`text-sm cursor-pointer transition-colors duration-200 tracking-wider py-2 ${
                activeSection === item.id ? 'text-[#00FF9C]' : 'text-[#445] hover:text-[#00FF9C]'
              }`}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;