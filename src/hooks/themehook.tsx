import { createContext, type Dispatch, type JSX, type ReactNode, type SetStateAction, useContext, useState, useEffect } from "react";

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
    toggleTheme: () => void;
}

const themeContext = createContext<ThemeContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(themeContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export default function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
    // Initialize theme from localStorage or system preference
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            return savedTheme;
        }

        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    });

    // Sync theme to localStorage and document
    useEffect(() => {
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [theme]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            // Only auto-update if user hasn't manually set a preference
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <themeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </themeContext.Provider>
    );
}