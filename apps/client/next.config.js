//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

!process.env.SKIP_ENV_VALIDATION && import('./src/env/server.mjs');
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/

/** @type {import("next").NextConfig} */
const config = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/signin',
        permanent: true,
      },
    ];
  },
};

module.exports = withNx(config);
