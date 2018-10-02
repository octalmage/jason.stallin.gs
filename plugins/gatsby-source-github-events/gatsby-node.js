const fetch = require('node-fetch');
const crypto = require('crypto');

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId },
  { plugins, ...options },
) => {
  const apiUrl = `https://api.github.com/users/${options.username}/events/public`;
  let data;
  try {
    const response = await fetch(apiUrl);
    data = await response.json();
  } catch (err) {
    // catches errors both in fetch and response.json
    console.log(err);
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
};
