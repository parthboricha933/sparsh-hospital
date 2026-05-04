'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Language, t as translate } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isGatewayDismissed: boolean;
  dismissGateway: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isGatewayDismissed, setIsGatewayDismissed] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const dismissGateway = useCallback(() => {
    setIsGatewayDismissed(true);
  }, []);

  const t = useCallback(
    (key: string) => translate(key, language),
    [language]
  );

  // Apply data-lang attribute to html element for CSS font switching
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-lang', language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, isGatewayDismissed, dismissGateway }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
