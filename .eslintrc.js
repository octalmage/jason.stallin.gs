module.exports = {
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": 0, // Gatsby includes a number of packages.
    "react/prop-types": 0, // Not sure how useful PropTypes are for my personal website.
    "react/forbid-prop-types": 0,
  },
  "globals": {
    "graphql": false,
    "fetch": false,
  }
};
