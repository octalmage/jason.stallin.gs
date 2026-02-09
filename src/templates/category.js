import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import PostIcons from '../components/PostIcons';
import { rhythm } from '../utils/typography';
import Layout from '../components/Layout';

const getPostsForCategory = (name, accessor) => ({ node }) => {
  if (!node[accessor] || !node[accessor].nodes) return false;
  return node[accessor].nodes.map(n => n.name).includes(name);
};

const CategoryTemplate = ({ data, pageContext }) => {
  const { name, type, accessor } = pageContext;
  const allPosts = data.allWpPost ? data.allWpPost.edges : [];
  const categoryPosts = allPosts.filter(getPostsForCategory(name, accessor));

  return (
    <Layout>
      <Helmet title={`${type}: ${name} | ${data.site.siteMetadata.title}`} />
      <h1>{type}: {name}</h1>
      {categoryPosts.map(({ node }) => (
        <div style={{ marginBottom: rhythm(2) }} key={node.slug}>
          <Link to={`/${node.slug}/`}>
            <h2>
              <span dangerouslySetInnerHTML={{ __html: node.title }} />
            </h2>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <PostIcons node={node} />
        </div>
      ))}
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query categoryPageQuery {
    allWpPost(sort: {fields: [date], order: DESC}) {
      edges {
        node {
          title
          excerpt
          slug
          date
          tags {
            nodes {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
