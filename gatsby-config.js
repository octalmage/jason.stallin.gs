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
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'WPGraphQL',
        fieldName: 'wpgraphql',
        url: 'https://json.wpengine.com/graphql',
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
    'gatsby-plugin-image',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['UA-57460911-1'],
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Jason Stallings',
        short_name: 'Jason',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#000000',
        display: 'minimal-ui',
        icon: 'src/assets/icon.png',
      },
    },
    {
      resolve: 'gatsby-source-github-events',
      options: {
        username: 'octalmage',
        token: process.env.GITHUB_TOKEN,
      },
    },
  ],
};
