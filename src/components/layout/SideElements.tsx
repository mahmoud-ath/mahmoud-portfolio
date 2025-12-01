import React from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS_DATA } from '../../lib/data/social_links';
import { useCurrentSection } from '../../lib/hooks/useCurrentSection';

const SideElements: React.FC = () => {
  const isDarkBackground = useCurrentSection();
  return (
    <>
      {/* Left Side - Socials */}
      <div className={`fixed left-6 bottom-0 hidden md:flex flex-col items-center gap-6 z-30 transition-colors duration-300 ${isDarkBackground ? 'text-white' : 'text-themeDark'}`}>
        <a href={SOCIAL_LINKS_DATA.github} target="_blank" rel="noreferrer" className="hover:-translate-y-1 transition-transform duration-300 hover:text-themeRed">
          <Github size={20} />
        </a>
        <a href={SOCIAL_LINKS_DATA.instagram} target="_blank" rel="noreferrer" className="hover:-translate-y-1 transition-transform duration-300 hover:text-themeRed">
          <Instagram size={20} />
        </a>
        
        <a href={SOCIAL_LINKS_DATA.linkedin} target="_blank" rel="noreferrer" className="hover:-translate-y-1 transition-transform duration-300 hover:text-themeRed">
          <Linkedin size={20} />
        </a>
        <div className={`w-[1px] h-24 mt-2 transition-colors duration-300 ${isDarkBackground ? 'bg-white' : 'bg-themeDark'}`}></div>
      </div>

      {/* Right Side - Email */}
      <div className={`fixed right-6 bottom-0 hidden md:flex flex-col items-center gap-6 z-30 transition-colors duration-300 ${isDarkBackground ? 'text-white' : 'text-themeDark'}`}>
        <a href={`mailto:${SOCIAL_LINKS_DATA.email}`} className="writing-vertical-rl hover:-translate-y-1 transition-transform duration-300 text-sm tracking-widest hover:text-themeRed" style={{ writingMode: 'vertical-rl' }}>
          {SOCIAL_LINKS_DATA.email}
        </a>
        <div className={`w-[1px] h-24 mt-2 transition-colors duration-300 ${isDarkBackground ? 'bg-white' : 'bg-themeDark'}`}></div>
      </div>
    </>
  );
};

export default SideElements;