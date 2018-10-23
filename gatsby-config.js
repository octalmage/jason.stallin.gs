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
    {
      resolve: 'gatsby-source-github',
      options: {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        queries: [`
          {
            viewer {
              repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
                edges {
                  node {
                    id
                    name
                    description
                    stargazers {
                      totalCount
                    }
                    watchers {
                      totalCount
                    }
                    forkCount
                    homepageUrl
                    pushedAt
                    defaultBranchRef {
                      name
                    }
                  }
                }
              }
            }
          }
        `],
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
        token: process.env.GH_TOKEN,
      },
    },
    'gatsby-plugin-offline',
  ],
};
