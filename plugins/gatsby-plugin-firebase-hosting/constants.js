module.exports.DEFAULT_FIREBASE_JSON = {
  hosting: {
    public: 'public',
    rewrites: [],
    redirects: [],
    headers: [
      {
        source: '**/*.html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '**/*.@(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=31536000,immutable',
          },
        ],
      },
      {
        source: '**/static/**/*.*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=31536000,immutable',
          },
        ],
      },
      {
        source: '**/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache',
          },
        ],
      },
    ],
  },
};
