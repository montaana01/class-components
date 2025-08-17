import { type ReactNode } from 'react';
import MainPage from '@/components/MainPage';

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return <MainPage>{children}</MainPage>;
}
