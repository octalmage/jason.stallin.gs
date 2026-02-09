import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PostIcons from '../components/PostIcons';
import Layout from '../components/Layout';
import { rhythm } from '../utils/typography';

const Posts = ({ data }) => (
  <Layout>
    <Helmet title={`Blog | ${data.site.siteMetadata.title}`} />
    <h1>Blog</h1>
    {data.allWpPost && data.allWpPost.edges.map(({ node }) => (
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

Posts.propTypes = {
  data: PropTypes.shape({
    allWpPost: PropTypes.object,
  }).isRequired,
};

export default Posts;

export const pageQuery = graphql`
  query blogPageQuery {
    site {
      siteMetadata {
        title
      }
    }
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
  }
`;
