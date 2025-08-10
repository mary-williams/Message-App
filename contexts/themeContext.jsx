import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const lightColors = {
  background: "#ffffff",
  backgroundAlt: "#f5f5f5",
  text: "#000000",
  accent: "#3b82f6",
  grey: "#666666",
  primary: "#3b82f6"
};

export const darkColors = {
  background: "#1a1a1a",
  backgroundAlt: "#2d2d2d",
  text: "#ffffff",
  accent: "#60a5fa",
  grey: "#999999",
  primary: "#60a5fa"
};

// Create the context
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  colors: lightColors
});

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('isDarkMode');
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);