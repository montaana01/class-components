import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ru'] as const;

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale ?? 'en';

  const messages = (await import(`./messages/${safeLocale}.json`)).default;

  return {
    locale: safeLocale,
    messages,
    now: new Date(),
    timeZone: 'Europe/Moscow',
  };
});
