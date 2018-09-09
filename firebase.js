module.exports = {
  hosting: {
    public: 'public',
    rewrites: [
      {
        source: '/api/sendContactEmail',
        function: 'sendContactEmail',
      },
      {
        source: '/api/cacheLatestGithubProject',
        function: 'cacheLatestGithubProject',
      },
    ],
    headers: [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=604800',
          },
        ],
      },
    ],
  },
};
