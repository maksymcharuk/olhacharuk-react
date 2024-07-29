import { PropsWithChildren, useEffect, useState } from "react";
import ThemeContext from "../contexts/theme.context";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Theme } from "../../configs/types";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { get, set } = useLocalStorage();
  const [theme, setTheme] = useState<Theme>((): Theme => {
    const savedTheme = get<Theme>("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    set("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
