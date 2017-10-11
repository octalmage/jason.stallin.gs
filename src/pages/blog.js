import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import Link from 'gatsby-link';

import PostIcons from '../components/PostIcons';

import { rhythm } from '../utils/typography';

const Posts = ({ data }) =>
  (
    <div>
      <h1>Blog</h1>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div css={{ marginBottom: rhythm(2) }} key={node.slug}>
          <Link to={`/${node.slug}/`} href={`/${node.slug}/`} css={{ textDecoration: 'none' }}>
            <h2><span dangerouslySetInnerHTML={{ __html: node.title }} /></h2>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <PostIcons node={node} />
        </div>
    ))}
    </div>
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
