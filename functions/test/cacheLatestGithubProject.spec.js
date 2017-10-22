/* eslint global-require: 0 */
let cacheLatestGithubProject;
let functions;
let admin;
let response;
let status;
let set;

// Helper to mock Firebase admin calls.
const buildDatabaseMock = (val = null) => {
  set = jest.fn();
  return jest.fn().mockReturnValue({
    ref: jest.fn().mockReturnValue({
      set,
      once: jest.fn().mockReturnValue(Promise.resolve({ val: () => val })),
    }),
  });
};

beforeEach(() => {
  global.fetch = require('jest-fetch-mock');
  jest.mock('node-fetch', () => global.fetch);
  admin = require('firebase-admin');
  admin.initializeApp = jest.fn();
  admin.database = buildDatabaseMock();

  functions = require('firebase-functions');
  functions.config = jest.fn().mockReturnValue({
    gmail: {
      email: '',
      password: '',
    },
    firebase: {},
  });

  // Short circuit onRequest to pass through the function.
  functions.https.onRequest = jest.fn().mockImplementation(func => func);

  // Mock express response.
  response = {
    set: jest.fn(),
    removeHeader: jest.fn(),
    send: jest.fn(),
  };

  status = { status: 200 };

  ({ cacheLatestGithubProject } = require('../index'));
});

afterEach(() => {
  fetch.resetMocks();
});

describe('cacheLatestGithubProject', async () => {
  test('Makes a request to GitHub and stores the response when there is no cache.', (done) => {
    const fakeResponse = [{ id: 1234 }];
    fetch.mockResponseOnce(JSON.stringify(fakeResponse), status);
    cacheLatestGithubProject({ query: { username: 'octalmage' } }, response)
      .then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(response.send).toHaveBeenCalledWith(fakeResponse);
        done();
      });
  });

  test('Does not make a request to GitHub when the response is already cached.', (done) => {
    fetch.mockResponseOnce(JSON.stringify({}), status);
    const timestamp = Date.now();
    global.Date.now = () => timestamp;

    const cachedResponse = {
      timestamp,
      data: ['cached response'],
    };

    admin.database = buildDatabaseMock(cachedResponse);

    cacheLatestGithubProject({ query: { username: 'octalmage' } }, response)
      .then(() => {
        expect(fetch).not.toHaveBeenCalled();
        expect(response.send).toHaveBeenCalledWith(cachedResponse.data);
        done();
      });
  });

  test('Does make a request to GitHub when the response is already cached but expired.', (done) => {
    fetch.mockResponseOnce(JSON.stringify(['new response']), status);
    const timestamp = Date.now();

    // Make current time after timestam expiration date.
    global.Date.now = () => timestamp + (1000 * 60 * 60) + 1;

    const cachedResponse = {
      timestamp,
      data: ['cached response'],
    };

    admin.database = buildDatabaseMock(cachedResponse);

    cacheLatestGithubProject({ query: { username: 'octalmage' } }, response)
      .then(() => {
        expect(fetch).toHaveBeenCalled();
        expect(response.send).toHaveBeenCalledWith(cachedResponse.data);
        expect(set).toHaveBeenCalledWith({
          timestamp: Date.now(),
          data: ['new response'],
        });
        done();
      });
  });
});
