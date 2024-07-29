import { useContext } from "react";
import ThemeContext from "../app/contexts/theme.context";

export const useTheme = () => useContext(ThemeContext);
