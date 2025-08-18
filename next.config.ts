import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  sassOptions: {
    includePaths: ['./components'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
