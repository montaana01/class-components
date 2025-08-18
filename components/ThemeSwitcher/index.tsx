'use client';

import { useTheme } from '../../context/ThemeContext';
import { useTranslations } from 'next-intl';

export const ThemeSwitcher = () => {
  const t = useTranslations('Theme');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <select
        value={theme}
        onChange={() => toggleTheme()}
        className="theme-select button"
      >
        <option value="light">{t('light')}</option>
        <option value="dark">{t('dark')}</option>
      </select>
    </div>
  );
};
