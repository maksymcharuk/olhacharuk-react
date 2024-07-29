import { createContext } from "react";
import { Theme } from "../../configs/types";

export interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: "dark", // default theme
  toggleTheme: () => {},
});

export default ThemeContext;
