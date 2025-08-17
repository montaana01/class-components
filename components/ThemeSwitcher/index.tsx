'use client';

import { useTheme } from '../../context/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <select
        value={theme}
        onChange={() => toggleTheme()}
        className="theme-select button"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};
