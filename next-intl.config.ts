import type { LocalePrefix } from 'next-intl/routing';

export default {
  locales: ['en', 'ru'] as const,
  defaultLocale: 'ru' as const,
  localePrefix: 'always' as LocalePrefix,
};
