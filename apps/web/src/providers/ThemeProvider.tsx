import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const commonVars = {
  '--space-xs': '4px',
  '--space-sm': '8px',
  '--space-md': '16px',
  '--space-lg': '24px',
  '--space-xl': '32px',
  '--radius-none': '0px',
  '--radius-sm': '8px',
  '--radius-md': '12px',
  '--radius-pill': '999px',
  '--font-main': 'Satoshi Variable, Inter, system-ui, sans-serif',
} as const;

const lightVars: CSSProperties = {
  '--color-bg': '#fdf8f8',
  '--color-panel': '#ffffff',
  '--color-ink': '#111111',
  '--color-muted': '#5a5252',
  '--color-border': '#111111',
  '--color-accent': '#a01c30',
  '--color-warning': '#8e6010',
  '--color-success': '#295926',
  '--app-surface': 'rgba(255, 255, 255, 0.84)',
  '--app-shadow': 'rgba(15, 10, 7, 0.08)',
  '--app-accent-1': 'rgba(160, 28, 48, 0.08)',
  '--app-accent-2': 'rgba(66, 73, 91, 0.06)',
  '--app-accent-3': 'rgba(142, 96, 16, 0.06)',
  ...commonVars,
} as CSSProperties;

const darkVars: CSSProperties = {
  '--color-bg': '#0e1116',
  '--color-panel': '#171b24',
  '--color-ink': '#f4efe7',
  '--color-muted': '#b9b2aa',
  '--color-border': '#f4efe7',
  '--color-accent': '#ef6a7b',
  '--color-warning': '#d7a24e',
  '--color-success': '#7bb57c',
  '--app-surface': 'rgba(23, 27, 36, 0.82)',
  '--app-shadow': 'rgba(0, 0, 0, 0.35)',
  '--app-accent-1': 'rgba(239, 106, 123, 0.18)',
  '--app-accent-2': 'rgba(155, 177, 255, 0.16)',
  '--app-accent-3': 'rgba(215, 162, 78, 0.14)',
  ...commonVars,
} as CSSProperties;

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const storedTheme = window.localStorage.getItem('tic-theme');
    return storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  });

  useEffect(() => {
    window.localStorage.setItem('tic-theme', theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => {
        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark',
        );
      },
    }),
    [theme],
  );

  const themeVars = theme === 'dark' ? darkVars : lightVars;

  return (
    <ThemeContext.Provider value={value}>
      <div className="theme-root" data-theme={theme} style={themeVars}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
