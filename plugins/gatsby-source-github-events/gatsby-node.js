const fetch = require('node-fetch');
const crypto = require('crypto');

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, reporter },
  { plugins, ...options },
) => {
  reporter.info('Fetching data from the GitHub events API');
  const apiUrl = `https://api.github.com/users/${options.username}/events/public`;
  let data;
  try {
    const buff = Buffer.from(`${options.username}:${options.token}`);
    const base64data = buff.toString('base64');
    const response = await fetch(apiUrl, {
      headers: new Headers({
        Authorization: `Basic ${base64data}`,
      }),
    });
    data = await response.json();
  } catch (err) {
    // catches errors both in fetch and response.json
    reporter.error('Error fetching data from GitHub events API', err);
    return;
  }
  if (data.legnth < 0) {
    reporter.error('No events returned from GitHub');
    return;
  }

  data.forEach((event) => {
    createNode({
      ...event,
      id: createNodeId(`github-events-${event.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'GitHubEvent',
        content: JSON.stringify(data),
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(data))
          .digest('hex'),
      },
    });
  });
  reporter.success('Data fetched from GitHub events API');
};
