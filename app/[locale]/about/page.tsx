'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Container from '@/components/Container';

export default function AboutApp() {
  const t = useTranslations('About');
  const router = useRouter();

  const handleBackClick = () => router.back();

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
        <button type="button" onClick={handleBackClick}>
          {t('buttonTitle')}
        </button>
      </div>
    </Container>
  );
}
