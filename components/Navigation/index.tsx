'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item">
          <Link
            href="/search"
            className={pathname.includes('search') ? 'nav-link active' : 'nav-link'}

          >
            {t('search')}
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/about" className={pathname.includes('about') ? 'nav-link active' : 'nav-link'}>
            {t('about')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
