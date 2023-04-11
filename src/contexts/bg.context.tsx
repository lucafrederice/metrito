import React, { createContext, useContext, useState } from 'react';

type Color = string;
type ContextType = {
    color: Color;
    setColor: (color: Color) => void;
};

const ThemeContext = createContext<ContextType>({
    color: '',
    setColor: () => { },
});

type ThemeProviderProps = {
    children: React.ReactNode;
};

export const BgProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [color, setColor] = useState<Color>('');

    const value: ContextType = {
        color,
        setColor,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useBg = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
