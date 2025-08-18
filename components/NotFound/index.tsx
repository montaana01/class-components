'use client';
import { useTranslations } from 'next-intl';
import Container from '@/components/Container';
import { createNavigation } from 'next-intl/navigation';

const { Link } = createNavigation({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <Container>
      <h1>{t('title')}</h1>
      <Link href="/">{t('buttonTitle')}</Link>
    </Container>
  );
}
