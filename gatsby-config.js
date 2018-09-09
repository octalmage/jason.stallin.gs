const firebaseConfig = require('./firebase');

module.exports = {
  siteMetadata: {
    title: 'Jason Stallings',
    subtitle: 'Software Developer',
    description: 'Hey! I\'m Jason Stallings and I\'m a prolific open source software developer.',
    siteUrl: 'https://jason.stallin.gs',
  },
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'json.wpengine.com',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: false,
        verbose: false,
        excludedRoutes: [
          '/*/*/comments',
          '/*/*/users',
          '/*/*/media',
          '**/cpp/**',
          '**/jetpack/**',
          '**/gutenberg/**',
          '**/yoast/**',
          '**/akismet/**',
          '**/contact-form-7/**',
        ],
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/assets/`,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://22f4f2b0f1374a77b5a69c264a601797@sentry.io/233742',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-57460911-1',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-firebase-hosting',
      options: {
        enabled: process.env.CI === 'true',
        firebaseConfig,
      },
    },
    'gatsby-plugin-offline',
  ],
};
