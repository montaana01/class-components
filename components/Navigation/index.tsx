'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link
            href="/search"
            className={pathname === '/search' ? 'active' : ''}
          >
            {t('search')}
          </Link>
        </li>
        <li>
          <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
            {t('about')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
