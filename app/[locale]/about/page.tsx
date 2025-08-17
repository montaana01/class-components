import { useTranslations } from 'next-intl';
import Container from '@/components/Container';
import Link from 'next/link';

export default function AboutApp() {
  const t = useTranslations('About');
  return (
    <Container>
      <div className="about">
        <h2>{t('title')}</h2>
        <p>{t('author')}</p>
        <p>
          [React Course [2025] -{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
          >
            RS School
          </a>
          ]
        </p>
        <Link href="/">{t('buttonTitle')}</Link>
      </div>{' '}
    </Container>
  );
}
