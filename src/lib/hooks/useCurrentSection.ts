import { useEffect, useState } from 'react';

const throttle = (func: () => void, limit: number) => {
  let lastCall = 0;
  return () => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func();
    }
  };
};

export const useCurrentSection = () => {
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const sections = document.querySelectorAll('section[id]');
      let darkFound = false;

      sections.forEach((section) => {
        const rect = (section as HTMLElement).getBoundingClientRect();
        
        // Check if section is in viewport (at least 30% visible)
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {
          const element = section as HTMLElement;
          
          // Direct check for contact section
          if (element.id === 'contact') {
            darkFound = true;
            return;
          }

          // Check computed background color
          const bgColor = window.getComputedStyle(element).backgroundColor;
          
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
            // Parse RGB/RGBA
            const rgbMatch = bgColor.match(/\d+/g);
            if (rgbMatch && rgbMatch.length >= 3) {
              const [r, g, b] = rgbMatch.map(Number);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              if (brightness < 120) {
                darkFound = true;
              }
            }
          }
        }
      });

      setIsDarkBackground(darkFound);
    };

    // Check on mount
    checkBackground();

    // Throttled scroll handler
    const throttledCheck = throttle(checkBackground, 50);

    // Check on scroll
    window.addEventListener('scroll', throttledCheck, { passive: true });
    window.addEventListener('resize', checkBackground);

    return () => {
      window.removeEventListener('scroll', throttledCheck);
      window.removeEventListener('resize', checkBackground);
    };
  }, []);

  return isDarkBackground;
};
