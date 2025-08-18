'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const locale = pathname.split('/')[1];
    if (locale && ['en', 'ru'].includes(locale)) {
      setCurrentLocale(locale);
    }
  }, [pathname]);

  const switchLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setCurrentLocale(newLocale);

    const newPath = pathname.replace(/^\/(en|ru)/, `/${newLocale}`);
    router.push(newPath);
  };

  if (!isMounted) {
    return (
      <select className="button" disabled>
        <option>Loading...</option>
      </select>
    );
  }

  return (
    <select value={currentLocale} onChange={switchLanguage} className="button">
      <option value="en">🇬🇧</option>
      <option value="ru">🇷🇺</option>
    </select>
  );
}
