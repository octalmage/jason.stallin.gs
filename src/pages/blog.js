import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PostIcons from '../components/PostIcons';
import Layout from '../components/Layout';
import typography from '../utils/typography';

const { rhythm } = typography;

const Posts = ({ data }) =>
  (
    <Layout>
      <Helmet title={`Blog | ${data.site.siteMetadata.title}`} />
      <h1>Blog</h1>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div style={{ marginBottom: rhythm(2) }} key={node.slug}>
          <Link to={`/${node.slug}/`} href={`/${node.slug}/`}>
            <h2><span dangerouslySetInnerHTML={{ __html: node.title }} /></h2>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <PostIcons node={node} />
        </div>
    ))}
    </Layout>
  );

Posts.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.object,
  }).isRequired,
};

export default Posts;

// Set here the ID of the home page.
export const pageQuery = graphql`
  query blogPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(sort: {fields: [date], order: DESC}) {
      edges {
        node {
          title
          excerpt
          slug
          ...PostIcons
        }
      }
    }
  }
`;
