/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/auth/register/:path*',
        destination: '/auth/register',
        permanent: true,
      },
      {
        source: '/auth/recoveryPassword/:path*',
        destination: '/auth/recoveryPassword',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
