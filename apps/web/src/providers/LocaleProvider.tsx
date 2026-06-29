import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Language = 'es' | 'en';

interface LocaleContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLanguage = window.localStorage.getItem('tic-language');
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      return storedLanguage;
    }

    return window.navigator.language.toLowerCase().startsWith('en')
      ? 'en'
      : 'es';
  });

  const value = useMemo<LocaleContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => {
        setLanguage((currentLanguage) =>
          currentLanguage === 'es' ? 'en' : 'es',
        );
      },
    }),
    [language],
  );

  window.localStorage.setItem('tic-language', language);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return context;
}