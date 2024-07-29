import { PropsWithChildren, useEffect, useState } from "react";
import ThemeContext from "../contexts/theme.context";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Theme } from "../../configs/types";
import { useTheme } from "../../hooks/useTheme";
import { THEME_KEY } from "../../configs/constants";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const themeContext = useTheme();
  const { get, set } = useLocalStorage();
  const [theme, setTheme] = useState<Theme>((): Theme => {
    const savedTheme = get<Theme>(THEME_KEY);
    return savedTheme || themeContext.theme;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    set(THEME_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
