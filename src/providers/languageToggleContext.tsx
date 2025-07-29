'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export type Language = 'en' | 'fr';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  
  // Determine default language based on route
  const getDefaultLanguage = (): Language => {
    if (pathname === '/drive') {
      return 'fr';
    }
    return 'en';
  };
  
  const [language, setLanguage] = useState<Language>(getDefaultLanguage());
  const [userHasChangedLanguage, setUserHasChangedLanguage] = useState(false);
  const [previousPathname, setPreviousPathname] = useState<string>(pathname);

  // Update language when route changes
  useEffect(() => {
    const defaultLang = getDefaultLanguage();
    
    // Only reset language if we're navigating to a different page
    if (pathname !== previousPathname) {
      if (pathname === '/drive') {
        // Always reset to French when landing on /drive page from another page
        setLanguage('fr');
        setUserHasChangedLanguage(false);
      } else if (!userHasChangedLanguage) {
        // For other pages, only change if user hasn't manually changed it
        setLanguage(defaultLang);
      }
      setPreviousPathname(pathname);
    }
  }, [pathname, userHasChangedLanguage, previousPathname]);

  // Custom setLanguage that tracks manual changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setUserHasChangedLanguage(true);
  };

  const contextValue = useMemo(
    () => ({ language, setLanguage: handleSetLanguage }),
    [language]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
