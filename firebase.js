module.exports = {
  hosting: {
    public: 'public',
    redirects: [
      {
        source: '/javascript-error-reporting-for-wordpress/amp',
        destination: '/javascript-error-reporting-for-wordpress/',
        type: 301,
      },
      {
        source: '/tracking-re-renders-using-unique-object-identifiers-react/amp',
        destination: '/tracking-re-renders-using-unique-object-identifiers-react/',
        type: 301,
      },
      {
        source: '/ngrok-rock-wordpress-based-api/amp',
        destination: '/ngrok-rock-wordpress-based-api/',
        type: 301,
      },
      {
        source: '/automatically-mute-hulu-ads/amp',
        destination: '/automatically-mute-hulu-ads/',
        type: 301,
      },
      {
        source: '/minum/amp',
        destination: '/minum/',
        type: 301,
      },
      {
        source: '/node-js-desktop-automation/amp',
        destination: '/node-js-desktop-automation/',
        type: 301,
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
