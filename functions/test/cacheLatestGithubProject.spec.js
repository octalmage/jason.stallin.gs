global.fetch = require('jest-fetch-mock');

let cacheLatestGithubProject, configStub, adminInitStub, functions, admin;

beforeEach(() => {
  admin = require('firebase-admin');
  admin.initializeApp = jest.fn();

  functions = require('firebase-functions');
  functions.config = jest.fn().mockReturnValue({
    firebase: {
      gmai: 'https://not-a-project.firebaseio.com',
      storageBucket: 'not-a-project.appspot.com',
    }
  });

  cacheLatestGithubProject = require('../index').cacheLatestGithubProject;
});

describe('cacheLatestGithubProject', () => {
  test('Makes a request to GitHub and stores the response.', () => {

    fetch.mockResponse(JSON.stringify({ mock: 'response' }));
    cacheLatestGithubProject({ query: { username: 'octalmage' } });
  });
});
