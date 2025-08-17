'use client';

import { type ReactNode } from 'react';
import Navigation from '../Navigation';
import { ErrorButton } from '../ErrorButton';
import { useTranslations } from 'next-intl';

export default function MainPage({ children }: { children: ReactNode }) {
  const t = useTranslations('Index');

  return (
    <>
      <header className="header">
        <h1>{t('mainHeading')}</h1>
        <Navigation />
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <ErrorButton />
      </footer>
    </>
  );
}
