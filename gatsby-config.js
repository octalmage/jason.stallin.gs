module.exports = {
  siteMetadata: {
    title: 'Jason Stallings',
    subtitle: 'Software Developer',
    description: 'Hey! I\'m Jason Stallings and I\'m a prolific open source software developer.',
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
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://22f4f2b0f1374a77b5a69c264a601797@sentry.io/233742',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ],
};
