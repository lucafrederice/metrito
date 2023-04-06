import React, { createContext, useContext, useState } from 'react';

type Size = string;
type ContextType = {
  size: Size;
  setSize: (size: Size) => void;
};

const ThemeContext = createContext<ContextType>({
  size: '',
  setSize: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const BgOverlayProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [size, setSize] = useState<Size>('');

  const value: ContextType = {
    size,
    setSize,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useBgOverlay = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
