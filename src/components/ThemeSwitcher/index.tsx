import { useTheme } from '../../context/ThemeContext';
import type { Theme } from '../../types';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="theme-select"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};
