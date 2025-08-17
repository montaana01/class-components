import { useTranslations } from 'next-intl';
import Container from '@/components/Container';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <Container>
      <h1>{t('title')}</h1>
      <Link href="/">{t('buttonTitle')}</Link>
    </Container>
  );
}
