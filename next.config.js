/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/auth/register/code',
        destination: '/auth/register',
        permanent: true,
      },
      {
        source: '/auth/recoveryPassword/code',
        destination: '/auth/recoveryPassword',
        permanent: true,
      },
      {
        source: '/auth/recoveryPassword/new',
        destination: '/auth/recoveryPassword',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
