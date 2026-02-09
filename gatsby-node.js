const _ = require('lodash');
const path = require('path');
const fetch = require('node-fetch');

const WP_GRAPHQL_URL = 'https://json.wpengine.com/graphql';

async function wpQuery(query) {
  const response = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await response.json();
  return json.data;
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  // Fetch posts
  const postData = await wpQuery(`
    {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          databaseId
          title
          content
          excerpt
          slug
          status
          date
          categories {
            nodes {
              name
            }
          }
          tags {
            nodes {
              name
            }
          }
        }
      }
    }
  `);

  if (postData && postData.posts) {
    postData.posts.nodes.forEach((post) => {
      createNode({
        ...post,
        wpId: post.id,
        id: createNodeId(`wp-post-${post.databaseId}`),
        parent: null,
        children: [],
        internal: {
          type: 'WpPost',
          content: JSON.stringify(post),
          contentDigest: createContentDigest(post),
        },
      });
    });
  }

  // Fetch pages
  const pageData = await wpQuery(`
    {
      pages(first: 100) {
        nodes {
          id
          databaseId
          title
          content
          excerpt
          slug
          status
        }
      }
    }
  `);

  if (pageData && pageData.pages) {
    pageData.pages.nodes.forEach((page) => {
      createNode({
        ...page,
        wpId: page.id,
        id: createNodeId(`wp-page-${page.databaseId}`),
        parent: null,
        children: [],
        internal: {
          type: 'WpPage',
          content: JSON.stringify(page),
          contentDigest: createContentDigest(page),
        },
      });
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // ==== POSTS ====
  const postResult = await graphql(`
    {
      allWpPost(sort: {fields: [date], order: DESC}) {
        edges {
          node {
            id
            slug
            status
            date
            categories {
              nodes {
                name
              }
            }
            tags {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `);

  if (postResult.errors) {
    console.log(postResult.errors);
    throw postResult.errors;
  }

  const postTemplate = path.resolve('./src/templates/post.js');
  const categoryTemplate = path.resolve('./src/templates/category.js');
  const categorySet = new Set();
  const tagSet = new Set();

  if (postResult.data.allWpPost) {
    _.each(postResult.data.allWpPost.edges, (edge) => {
      if (edge.node.categories && edge.node.categories.nodes) {
        edge.node.categories.nodes.forEach((category) => {
          categorySet.add(JSON.stringify(category));
        });
      }
      if (edge.node.tags && edge.node.tags.nodes) {
        edge.node.tags.nodes.forEach((tag) => {
          tagSet.add(JSON.stringify(tag));
        });
      }

      createPage({
        path: edge.node.slug,
        component: postTemplate,
        context: {
          id: edge.node.id,
        },
      });

      createRedirect({
        fromPath: `/${edge.node.slug}/amp`,
        toPath: `/${edge.node.slug}/`,
        isPermanent: true,
      });
    });
  }

  // Create category listings.
  Array.from(categorySet).map(JSON.parse).forEach((category) => {
    createPage({
      path: `/category/${category.name.toLowerCase()}/`,
      component: categoryTemplate,
      context: {
        type: 'Category',
        name: category.name,
        accessor: 'categories',
      },
    });
  });

  // Create tag listings.
  Array.from(tagSet).map(JSON.parse).forEach((tag) => {
    createPage({
      path: `/tag/${tag.name.toLowerCase()}/`,
      component: categoryTemplate,
      context: {
        type: 'Tag',
        name: tag.name,
        accessor: 'tags',
      },
    });
  });
};
