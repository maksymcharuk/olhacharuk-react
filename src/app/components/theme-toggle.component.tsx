import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle btn btn--icon" onClick={toggleTheme}>
      {theme === "light" ? "🌚" : "🌞"}
    </button>
  );
}
