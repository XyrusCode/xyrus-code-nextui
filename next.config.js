/** @type {import('next').NextConfig} */
// const withOffline = require('next-offline')
const { sql } = require('@vercel/postgres');
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
      // spotify
      { hostname: 'i.scdn.co' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    if (!process.env.POSTGRES_URL) {
      // throw new Error('Missing POSTGRES_URL environment variable')
      return [];
    }

    const { rows: redirects } = await sql`
      SELECT source, destination, permanent
      FROM redirects;
    `;

    return redirects.map(({ source, destination, permanent }) => ({
      source,
      destination,
      permanent: !!permanent,
    }));
  },

  // headers() {
  // 	return [
  // 		{
  // 			source: '/(.*)',
  // 			headers: securityHeaders,
  // 		},
  // 	];
  // },
  //   workboxOpts: {
  //   swDest: process.env.NEXT_EXPORT
  //     ? 'service-worker.js'
  //     : 'static/service-worker.js',
  //   runtimeCaching: [
  //     {
  //       urlPattern: /^https?.*/,
  //       handler:  'NetworkFirst',
  //       options: {
  //         cacheName: 'offlineCache',
  //         expiration: {
  //           maxEntries: 200,
  //         },
  //       },
  //     },
  //   ],
  // },
  //     async rewrites() {
  //   return [
  //     {
  //       source: '/service-worker.js',
  //       destination: '/_next/static/service-worker.js',
  //     },
  //   ]
  // },
};

const ContentSecurityPolicy = `
    default-src 'self' vercel.live;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com sentry.io giscus.app;
	child-src 'self' vercel.live open.spotify.com;
	style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'self';
    connect-src *;
    font-src 'self' data:;
	frame-src 'self' vercel.live open.spotify.com giscus.app;
	frame-ancestors 'self';
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), ',
  },
];

// module.exports = withOffline(nextConfig);
module.exports = nextConfig;

// module.exports = withSentryConfig(
// 	module.exports,
// 	{
// 		// For all available options, see:
// 		// https://github.com/getsentry/sentry-webpack-plugin#options

// 		// Suppresses source map uploading logs during build
// 		silent: true,
// 		org: 'xyrus-code',
// 		project: 'xyrus-code-nextjs',
// 	},
// 	{
// 		// For all available options, see:
// 		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// 		// Upload a larger set of source maps for prettier stack traces (increases build time)
// 		widenClientFileUpload: true,

// 		// Transpiles SDK to be compatible with IE11 (increases bundle size)
// 		transpileClientSDK: true,

// 		// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
// 		tunnelRoute: '/monitoring',

// 		// Hides source maps from generated client bundles
// 		hideSourceMaps: true,

// 		// Automatically tree-shake Sentry logger statements to reduce bundle size
// 		disableLogger: true,

// 		// Enables automatic instrumentation of Vercel Cron Monitors.
// 		// See the following for more information:
// 		// https://docs.sentry.io/product/crons/
// 		// https://vercel.com/docs/cron-jobs
// 		automaticVercelMonitors: true,
// 	}
// );
