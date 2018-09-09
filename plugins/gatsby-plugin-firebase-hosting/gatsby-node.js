const fs = require('fs');
const mergeByKey = require('array-merge-by-key');

const { DEFAULT_FIREBASE_JSON } = require('./constants');

exports.onPostBuild = async ({ store, reporter }, userPluginOptions) => {
  if (typeof userPluginOptions.enabled !== 'undefined' && userPluginOptions.enabled !== true) {
    return Promise.resolve();
  }

  const { redirects } = store.getState();

  return new Promise((resolve) => {
    if (typeof userPluginOptions.firebaseConfig === 'undefined') {
      reporter.info('Firebase config not found, using default settings.');
      return resolve(DEFAULT_FIREBASE_JSON);
    }
    reporter.info('Firebase config found, merging default settings.');
    const newHosting = Object.assign({}, DEFAULT_FIREBASE_JSON.hosting);
    const currentFirebase = userPluginOptions.firebaseConfig;
    const { hosting: currentHosting } = currentFirebase;

    Object.keys(newHosting).forEach((key) => {
      if (Array.isArray(newHosting[key]) && typeof currentHosting[key] !== 'undefined') {
        newHosting[key] = mergeByKey('source', newHosting[key], currentHosting[key]);
      }
    });
    return resolve(Object.assign(currentFirebase, { hosting: newHosting }));
  })
    .then((config) => {
      const firebaseRedirects = redirects.map((redirect) => {
        const {
          fromPath,
          isPermanent,
          redirectInBrowser,
          toPath,
        } = redirect;

        if (redirectInBrowser) return null;

        return {
          source: fromPath,
          destination: toPath,
          type: isPermanent ? 301 : 302,
        };
      }).filter(r => r); // Remove empty items.
      const currentRedirects = typeof config.hosting.redirects === 'undefined' ? [] : config.hosting.redirects.slice(0);
      const newRedirects = currentRedirects.concat(firebaseRedirects);

      return Object.assign({}, config, {
        hosting: Object.assign({}, config.hosting, { redirects: newRedirects }),
      });
    })
    .then(config => new Promise((resolve, reject) => {
      fs.writeFile('firebase.json', JSON.stringify(config, null, 2), 'utf8', (err) => {
        if (err) reject(err);
        reporter.info('Wrote firebase.json.');
        resolve();
      });
    }));
};
