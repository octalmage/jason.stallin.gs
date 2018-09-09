const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const slash = require('slash');

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for Wordpress pages (route : /{slug})
// Will create pages for Wordpress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  return new Promise((resolve, reject) => {
    // ==== PROJECTS (CUSTOM POST TYPE) ====
    graphql(`
      {
        allWordpressWpProjects {
          edges {
            node {
              id
              slug
              status
              date
            }
          }
        }
      }
    `)
      .then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }
        // Create Page pages.
        const projectTemplate = path.resolve('./src/templates/project.js');
        _.each(result.data.allWordpressWpProjects.edges, (edge) => {
          createPage({
            path: `/projects/${edge.node.slug}`,
            component: slash(projectTemplate),
            context: {
              id: edge.node.id,
            },
          });
        });
      })
      // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
      .then(() => {
        graphql(`
            {
              allWordpressPost(sort: {fields: [date], order: DESC}) {
                edges {
                  node {
                    id
                    slug
                    status
                    template
                    format
                    date
                    categories {
                      name
                    }
                    tags {
                      name
                    }
                  }
                }
              }
            }
          `).then((result) => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }
          const postTemplate = path.resolve('./src/templates/post.js');
          // Create Page pages.
          const categoryTemplate = path.resolve('./src/templates/category.js');
          const categorySet = new Set();
          const tagSet = new Set();
          // We want to create a detailed page for each
          // post node. We'll just use the Wordpress Slug for the slug.
          // The Post ID is prefixed with 'POST_'
          _.each(result.data.allWordpressPost.edges, (edge) => {
            if (edge.node.categories) {
              edge.node.categories.forEach((category) => {
                categorySet.add(category);
              });
            }
            if (edge.node.tags) {
              edge.node.tags.forEach((tag) => {
                tagSet.add(tag);
              });
            }

            // Create actual blog post.
            createPage({
              path: edge.node.slug,
              component: slash(postTemplate),
              context: {
                id: edge.node.id,
              },
            });

            // Create redirect from amp page.
            createRedirect({
              fromPath: `/${edge.node.slug}/amp`,
              toPath: `/${edge.node.slug}/`,
              isPermanent: true,
            });

            // Create category listings.
            const categoryList = Array.from(categorySet);
            categoryList.forEach((category) => {
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
            const tagList = Array.from(tagSet);
            tagList.forEach((tag) => {
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
          });
          resolve();
        });
      });
    // ==== END POSTS ====
  });
};
