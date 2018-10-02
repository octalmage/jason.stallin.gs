const fetch = require('node-fetch');
const crypto = require('crypto');

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId },
  { plugins, ...options },
) => {
  const apiUrl = `https://api.github.com/users/${options.username}/events/public`;
  const response = await fetch(apiUrl);
  const data = await response.json();
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
};
