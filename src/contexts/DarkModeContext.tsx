import React, { createContext, useContext, useEffect, useState } from 'react';

type DarkModeStyle = 'github' | 'original';

interface DarkModeContextType {
  isDarkMode: boolean;
  darkModeStyle: DarkModeStyle;
  toggleDarkMode: () => void;
  cycleDarkStyle: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // default to dark
  const [darkModeStyle, setDarkModeStyle] = useState<DarkModeStyle>('github');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    const savedStyle = localStorage.getItem('dark-mode-style') as DarkModeStyle | null;

    // Default to dark (GitHub)
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : true;
    const style = savedStyle || 'github';

    setIsDarkMode(shouldBeDark);
    setDarkModeStyle(style);
    applyTheme(shouldBeDark, style);
    setIsLoading(false);
  }, []);

  const applyTheme = (dark: boolean, style: DarkModeStyle) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      root.classList.toggle('theme-original', style === 'original');
      root.classList.toggle('theme-github', style === 'github');
    } else {
      root.classList.remove('dark', 'theme-original', 'theme-github');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('theme-mode', newValue ? 'dark' : 'light');
      applyTheme(newValue, darkModeStyle);
      return newValue;
    });
  };

  const cycleDarkStyle = () => {
    setDarkModeStyle((prev) => {
      const next: DarkModeStyle = prev === 'github' ? 'original' : 'github';
      localStorage.setItem('dark-mode-style', next);
      if (isDarkMode) applyTheme(true, next);
      return next;
    });
  };

  if (isLoading) {
    return <div className="bg-themeLight dark:bg-themeDark min-h-screen" />;
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, darkModeStyle, toggleDarkMode, cycleDarkStyle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
