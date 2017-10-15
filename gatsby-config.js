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
        verbose: true,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-glamor',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-57460911-1',
      },
    },
    'gatsby-plugin-offline',
  ],
};
